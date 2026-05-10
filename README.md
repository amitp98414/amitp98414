# Hi 👋 I'm Amit Patil

## 🔐 Cybersecurity Portfolio

💻 Beginner Bug Bounty Hunter  
🛡️ Web Security Learner  
🎯 Goal: First Valid HackerOne Report

---

## 🚀 Skills

- Web Application Testing
- XSS
- IDOR
- API Testing
- Burp Suite
- Recon
- OWASP Top 10

---

## 🧰 Tools I Use

- Burp Suite
- Nmap
- Subfinder
- FFUF
- Waybackurls

---

## 📚 Current Learning

- PortSwigger Labs
- HackerOne Programs
- Authentication Bypass
- Access Control Testing

---

## 📈 2026 Goals

- Build Strong GitHub Portfolio
- First Valid Bug Report
- 50+ Labs Completed
- Daily Learning

---

## 🛡️ SOC + Bug Bounty Field Guide (Defender-Focused)

> This section is intentionally defensive and ethical: it explains attacker patterns so defenders can detect, contain, and prevent abuse.

### 1) XSS (Cross-Site Scripting)

**Red team perspective (what they look for):**
- Unsanitized input reflected in HTML/JS contexts.
- Stored payload opportunities in comments, profile fields, or rich-text inputs.
- DOM sinks that process untrusted data (e.g., dangerous use of dynamic HTML APIs).

**Blue team perspective (how to defend):**
- Context-aware output encoding.
- Strict Content Security Policy (CSP) with nonces/hashes.
- Input validation + sanitization libraries for rich content.
- HttpOnly/Secure/SameSite cookie controls to reduce token theft impact.

### 2) SSRF (Server-Side Request Forgery)

**Red team perspective:**
- Features that fetch URLs (webhooks, import-by-URL, image fetchers).
- Attempts to reach internal metadata endpoints and private services.

**Blue team perspective:**
- Allowlist outbound destinations and block internal IP ranges.
- Normalize/validate URLs before request execution.
- Enforce egress firewall rules from application tiers.
- Disable automatic redirects when possible.

### 3) RCE (Remote Code Execution)

**Red team perspective:**
- Injection points in command execution, template engines, deserialization, plugin systems.
- Chaining low-risk flaws into code execution via misconfig or weak isolation.

**Blue team perspective:**
- Never pass user input to shell commands directly.
- Keep runtimes/dependencies patched; remove unused packages.
- Run services with least privilege and strong sandboxing.
- Application allowlisting and EDR process monitoring.

### 4) Credential Stuffing

**Red team perspective:**
- Reuse of breached username/password pairs against login endpoints.
- Automated attempts distributed across IPs/devices to evade basic blocking.

**Blue team perspective:**
- MFA everywhere possible.
- Rate limiting + bot detection + device/IP reputation.
- Password breach checks and impossible-travel analytics.
- Adaptive authentication (step-up when risk is high).

### 5) Misconfigurations

**Red team perspective:**
- Default credentials, exposed admin panels, debug mode in production.
- Open storage buckets, permissive CORS, verbose error traces.

**Blue team perspective:**
- Hardened baseline images and secure-by-default templates.
- Continuous configuration auditing and policy-as-code checks.
- Secrets management and rotation.

---

## 🔍 Detection Logic and SIEM Thinking

### Detection logic examples (high level)
- **XSS:** spikes in blocked CSP violations, suspicious script-like patterns in request params.
- **SSRF:** application server making unusual outbound requests to link-local/private ranges.
- **RCE:** anomalous child processes from web/app servers (e.g., shell spawned by app process).
- **Credential stuffing:** many failed logins across many accounts from same fingerprint/IP cluster.
- **Misconfig abuse:** repeated access to admin/debug endpoints or cloud metadata paths.

### SIEM alert design principles
- Correlate multiple weak signals instead of one noisy indicator.
- Add context: user risk, asset criticality, geo/device novelty.
- Tune thresholds by baseline behavior (time-of-day and seasonality).
- Include clear triage fields: source IP, user, target host, process tree, URL/path.

---

## 📊 Log Analysis Playbook

1. **Scope:** Define affected users/systems/time window.
2. **Pivot:** Move across auth logs, WAF logs, app logs, EDR telemetry, cloud audit trails.
3. **Timeline:** Build sequence from initial access to actions on objectives.
4. **Differentiate noise vs signal:** compare with historical baselines.
5. **Validate impact:** data access, privilege changes, persistence, exfil indicators.
6. **Preserve evidence:** hash/retain critical logs and forensic artifacts.

---

## 🚨 Incident Response Workflow (SOC)

1. **Preparation:** runbooks, logging coverage, tabletop exercises.
2. **Identification:** detect + validate true positives quickly.
3. **Containment:** short-term isolation, token/session revocation, traffic controls.
4. **Eradication:** patch root cause, remove persistence, rotate secrets.
5. **Recovery:** restore services safely and monitor for recurrence.
6. **Lessons learned:** post-incident review, control improvements, updated detections.

---

## 📫 Connect With Me

Coming Soon...
