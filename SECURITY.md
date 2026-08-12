Security policy
===============

If you discover a security vulnerability, please do NOT open a public issue.
Instead, report it privately so it can be addressed responsibly.

Reporting options:

- Use GitHub Security Advisories for this repository (recommended) or
- Contact the repository maintainers via the email address listed on the profile, or
- Open a private disclosure through the project's preferred channel.

Please include: a brief description, steps to reproduce, impact, and contact details. Maintainers aim to acknowledge reports within 48 hours.

Thank you for helping keep this project secure.

---

Implemented mitigations (High package):

- HTTPS guidance: app should be deployed behind TLS; middleware forces HTTPS redirects and adds HSTS header
- Secure response headers: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Rate limiting: simple per-key in-memory limiter included as a middleware example; swap for Redis in production
- API key handling: constant-time comparison recommended; keep keys out of source and rotate regularly
- Secret management: use environment variables, do not commit secrets; example.env included
- Automated scans: Dependabot (weekly) and Semgrep CI workflow (.github/workflows/semgrep.yml and .semgrep.yml) to detect common issues
- Packaging: release ZIP generation script provided (package_release_fixed.ps1)

Testing and verification:

- Run Semgrep: semgrep --config .semgrep.yml
- Check headers: curl -I https://yourhost/health
- Verify rate limits: make repeated requests with same API key and expect 429 after limit

Notes and next steps:
- Replace in-memory rate limiter with Redis for multi-instance deployments
- Add DAST (OWASP ZAP) and SCA pipelines for deeper testing
- Schedule regular dependency updates and security reviews
