# Security Review Skill

Complete a security review of the pending changes on the current branch.

## Instructions

When the user runs /security-review, perform the following steps:

1. **Identify changes to review**:
   - Get the diff of current branch vs main: `git diff main...HEAD`
   - Also check uncommitted changes: `git diff`
   - List all modified files

2. **Perform security analysis** focusing on:

   ### Input Validation
   - Are all user inputs properly validated?
   - Is there proper sanitization of data?
   - Are there any SQL injection vulnerabilities?
   - Are there any command injection vulnerabilities?

   ### Authentication & Authorization
   - Are authentication checks in place?
   - Are authorization checks properly implemented?
   - Are there any bypasses possible?
   - Are tokens/credentials handled securely?

   ### XSS (Cross-Site Scripting)
   - Is user input properly escaped in HTML output?
   - Are there any v-html or dangerouslySetInnerHTML usages?
   - Is Content Security Policy considered?

   ### Sensitive Data
   - Are there any hardcoded secrets, API keys, or passwords?
   - Is sensitive data properly encrypted?
   - Are there any sensitive data leaks in logs?

   ### Dependencies
   - Are there any new dependencies added?
   - Do new dependencies have known vulnerabilities?

   ### API Security
   - Are API endpoints properly secured?
   - Is rate limiting considered?
   - Are CORS settings appropriate?

3. **Check for common vulnerability patterns**:
   - `eval()` usage
   - Dynamic code execution
   - Insecure deserialization
   - Path traversal vulnerabilities
   - Insecure direct object references

4. **Generate security report**

## Output Format

```markdown
## Security Review Report

**Branch:** feature/xyz
**Date:** 2024-01-15
**Files Reviewed:** 12

### Executive Summary
Overall risk level: LOW / MEDIUM / HIGH / CRITICAL
Brief summary of findings...

### Findings

#### CRITICAL
None found / List of critical issues...

#### HIGH
1. **[src/api/user.js:42]** SQL Injection Vulnerability
   - **Description:** User input is directly concatenated into SQL query
   - **Risk:** Attackers could execute arbitrary SQL commands
   - **Recommendation:** Use parameterized queries
   ```javascript
   // Before (vulnerable)
   const query = `SELECT * FROM users WHERE id = ${userId}`;

   // After (secure)
   const query = 'SELECT * FROM users WHERE id = ?';
   db.query(query, [userId]);
   ```

#### MEDIUM
...

#### LOW
...

### Recommendations
1. Priority fixes...
2. Best practices to implement...

### Files Reviewed
- src/api/user.js - 3 issues found
- src/components/Form.vue - No issues
- ...

### Checklist
- [x] Input validation checked
- [x] Authentication reviewed
- [x] XSS vulnerabilities checked
- [x] Sensitive data reviewed
- [ ] Dependencies audited (npm audit recommended)
```
