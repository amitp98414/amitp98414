from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi_security_middleware import SecureHeadersMiddleware, SimpleRateLimiter, RateLimitMiddleware

app = FastAPI()
# Demo rate limit low so we can show 429 quickly
app.add_middleware(SecureHeadersMiddleware)
limiter = SimpleRateLimiter(rate_per_minute=5)
app.add_middleware(RateLimitMiddleware, limiter=limiter, header_name="X-API-Key")

@app.get("/health")
async def health():
    return JSONResponse({"status": "ok"})

@app.get("/demo")
async def demo():
    return {"message": "This is a demo endpoint with security middleware enabled."}
