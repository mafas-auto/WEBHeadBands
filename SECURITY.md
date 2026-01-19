# Security Implementation Guide

## Overview

This document outlines the security measures implemented to protect the AI deck generation feature from common vulnerabilities.

## 🔒 Security Measures Implemented

### 1. API Key Protection (The Credential Shield)

**Problem:** API keys exposed in client-side code can be stolen and abused.

**Solution:**
- ✅ API key stored **only** on backend server in `.env` file
- ✅ Backend proxy server handles all OpenAI API calls
- ✅ Client never sees or sends API key
- ✅ `.env` files are in `.gitignore` (never committed)

**Architecture:**
```
Client (Browser) → Backend API → OpenAI API
                (No API Key)    (API Key Here)
```

### 2. Rate Limiting (The DoS Shield)

**Problem:** Unlimited requests can lead to DoS attacks and cost overruns.

**Solution:**
- ✅ `express-rate-limit` middleware
- ✅ **100 requests per 15 minutes per IP**
- ✅ Automatic rate limit headers returned
- ✅ Clear error messages when limit exceeded

**Configuration:**
```javascript
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // requests per window
```

### 3. Input Validation (The Injection Shield)

**Problem:** Malicious input can cause injection attacks or API abuse.

**Solution:**
- ✅ **Zod schema validation** on all inputs
- ✅ Length limits (3-200 characters)
- ✅ Character whitelist (alphanumeric + safe punctuation)
- ✅ Blocked dangerous patterns (`<script`, `javascript:`, etc.)
- ✅ Server-side validation (client validation is just UX)

**Validation Rules:**
```javascript
- Min length: 3 characters
- Max length: 200 characters
- Allowed: a-z, A-Z, 0-9, spaces, -_.,!?'
- Blocked: <script, javascript:, onerror=, eval(, etc.
```

### 4. Error Handling

**Problem:** Exposing internal errors can leak sensitive information.

**Solution:**
- ✅ Generic error messages to clients
- ✅ Detailed errors logged server-side only
- ✅ No API key or internal details in error responses

## 📁 File Structure

```
server/
  ├── server.js          # Express backend with security
  ├── package.json       # Dependencies
  ├── .env.example       # Template (no real keys)
  └── .gitignore        # Excludes .env

src/
  ├── services/
  │   └── aiDeckGenerator.js  # Client calls backend (no API key)
  └── screens/
      └── AIDeckScreen.jsx    # UI component
```

## 🚀 Deployment Checklist

### Backend Server

1. **Environment Variables:**
   ```bash
   OPENAI_API_KEY=sk-...          # Required
   PORT=3001                      # Optional
   ALLOWED_ORIGIN=https://...    # Your frontend URL
   NODE_ENV=production            # Optional
   ```

2. **Security:**
   - ✅ `.env` file exists and is NOT in Git
   - ✅ Server runs on HTTPS in production
   - ✅ CORS configured for specific origin only
   - ✅ Rate limiting enabled

3. **Deployment Options:**
   - **Option A:** Deploy to Railway, Render, or Fly.io
   - **Option B:** Use Cloudflare Workers (serverless)
   - **Option C:** Self-hosted VPS

### Frontend

1. **Environment Variables:**
   ```bash
   VITE_API_BASE_URL=https://your-api-server.com
   ```

2. **Security:**
   - ✅ No API keys in frontend code
   - ✅ All API calls go through backend proxy
   - ✅ CORS configured correctly

## 🧪 Testing Security

### Test Rate Limiting:
```bash
# Should fail after 100 requests
for i in {1..101}; do
  curl -X POST http://localhost:3001/api/generate-deck \
    -H "Content-Type: application/json" \
    -d '{"prompt":"test"}'
done
```

### Test Input Validation:
```bash
# Should fail - too short
curl -X POST http://localhost:3001/api/generate-deck \
  -H "Content-Type: application/json" \
  -d '{"prompt":"ab"}'

# Should fail - contains script tag
curl -X POST http://localhost:3001/api/generate-deck \
  -H "Content-Type: application/json" \
  -d '{"prompt":"<script>alert(1)</script>"}'
```

## 🔍 Monitoring

### Recommended Monitoring:
- Rate limit hits (log when users hit limits)
- API errors (track OpenAI API failures)
- Response times (detect performance issues)
- Cost tracking (monitor OpenAI usage)

### Logging:
- ✅ All errors logged server-side
- ✅ Rate limit violations logged
- ✅ Invalid input attempts logged

## 🚨 Incident Response

If API key is compromised:
1. **Immediately** revoke key in OpenAI dashboard
2. Generate new API key
3. Update `.env` file on server
4. Restart server
5. Review logs for abuse

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OpenAI API Security](https://platform.openai.com/docs/guides/safety-best-practices)

## ✅ Security Checklist

- [x] API key never in client code
- [x] Rate limiting implemented
- [x] Input validation with Zod
- [x] CORS configured
- [x] Error messages don't leak info
- [x] `.env` in `.gitignore`
- [x] HTTPS in production
- [x] Server-side validation
- [x] Logging for security events

