Security hardening implemented (High package)

What was added:

1. FastAPI middleware sample (fastapi_security_middleware.py)
   - HTTPS redirect
   - Secure response headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
   - Simple in-memory per-key rate limiter (configurable)

2. CI & scanning
   - .github/dependabot.yml — weekly dependency updates
   - .github/workflows/semgrep.yml — runs Semgrep on PRs and pushes
   - .semgrep.yml — basic detection rules (AWS keys, private keys, suspicious long literals)

3. Documentation & checklist
   - SECURITY_HARDENING.md (this file)
   - SECURITY.md updated to describe how to report and which mitigations implemented

How to integrate middleware (app/main):

from fastapi import FastAPI
from fastapi_security_middleware import install_security_middleware

app = FastAPI()
install_security_middleware(app, rate_limit_per_minute=60)

Notes & limitations:
- The rate limiter is intentionally simple (in-memory). For production, use Redis or a distributed store.
- Semgrep and Dependabot are configured to run in GitHub CI — enable GitHub Actions and Dependabot for the repo to activate them.
- Ensure HTTPS is terminated at the edge (load balancer / reverse proxy) and that the app runs behind TLS. The middleware enforces redirects and sets HSTS.

Quick tests:
- Start the app and run: curl -I http://localhost:8000/health
  Expect a 301 redirect to https (if HTTPS middleware enabled) or secure headers on https response.
- Run semgrep locally: semgrep --config .semgrep.yml
- Check Dependabot setup in .github/dependabot.yml

If you want, I can wire the rate limiter to Redis, add automated dependency fixes, and expand Semgrep rules (SSTI, SQL injection patterns).