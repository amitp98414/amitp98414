# FastAPI security middleware examples: secure headers, HTTPS redirect, simple per-key rate limiter
# Drop this file into your project and import install_security_middleware(app)

from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.types import ASGIApp, Receive, Scope, Send
from starlette.responses import Response
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
import time
import threading

class SecureHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        # Content Security Policy - tune for your site
        response.headers.setdefault("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        response.headers.setdefault("Permissions-Policy", "geolocation=()")
        # HSTS: one year, includeSubDomains, preload - only add when site fully HTTPS
        response.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
        return response

class SimpleRateLimiter:
    """Very small in-memory rate limiter keyed by API key or client IP.
    Not suitable for distributed deployments. Use Redis or similar for production.
    """
    def __init__(self, rate_per_minute=60):
        self.rate = rate_per_minute
        self.lock = threading.Lock()
        self.storage = {}  # key -> (window_start_ts, count)

    def allow(self, key: str) -> bool:
        now = int(time.time())
        window = now // 60
        with self.lock:
            entry = self.storage.get(key)
            if entry is None or entry[0] != window:
                self.storage[key] = (window, 1)
                return True
            if entry[1] < self.rate:
                self.storage[key] = (entry[0], entry[1] + 1)
                return True
            return False

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, limiter: SimpleRateLimiter, header_name: str = "X-API-Key"):
        super().__init__(app)
        self.limiter = limiter
        self.header = header_name

    async def dispatch(self, request: Request, call_next):
        # Try API key first; fallback to client IP
        api_key = request.headers.get(self.header)
        key = api_key if api_key else request.client.host
        if not self.limiter.allow(key):
            # Return 429 with Retry-After (seconds until next minute window)
            now = int(time.time())
            retry_after = 60 - (now % 60)
            raise HTTPException(status_code=429, detail="Rate limit exceeded. Retry after {} seconds".format(retry_after))
        response = await call_next(request)
        return response

def install_security_middleware(app, rate_limit_per_minute: int = 120, api_key_header: str = "X-API-Key"):
    # 1) HTTPS redirect (edge termination recommended; this forces redirect if direct access via http)
    app.add_middleware(HTTPSRedirectMiddleware)
    # 2) secure headers
    app.add_middleware(SecureHeadersMiddleware)
    # 3) rate limiting
    limiter = SimpleRateLimiter(rate_per_minute=rate_limit_per_minute)
    app.add_middleware(RateLimitMiddleware, limiter=limiter, header_name=api_key_header)

# Usage:
# from fastapi import FastAPI
# from fastapi_security_middleware import install_security_middleware
# app = FastAPI()
# install_security_middleware(app, rate_limit_per_minute=60)
