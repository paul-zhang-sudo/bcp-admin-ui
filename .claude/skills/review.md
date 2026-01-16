# Review Skill

Review a pull request or code changes.

## Instructions

When the user runs /review, perform the following steps:

1. **Identify what to review**:
   - If a PR number is provided (e.g., `/review 123`), fetch the PR details using `gh pr view <number>`
   - If no PR number is provided, review the current uncommitted changes using `git diff`
   - If on a feature branch, compare with the main branch using `git diff main...HEAD`

2. **Analyze the changes**:
   - Read through all modified files
   - Understand the purpose of the changes
   - Check for potential bugs or issues

3. **Provide a comprehensive review** covering:
   - **Summary**: What the changes do
   - **Code Quality**:
     - Is the code clean and readable?
     - Are there any code smells?
     - Is there unnecessary complexity?
   - **Potential Issues**:
     - Logic errors
     - Edge cases not handled
     - Performance concerns
   - **Security**:
     - Any security vulnerabilities?
     - Proper input validation?
   - **Suggestions**:
     - Improvements that could be made
     - Alternative approaches if applicable

4. **Format the review** in a clear, structured manner with specific line references.

## Usage Examples

- `/review` - Review current uncommitted changes
- `/review 123` - Review PR #123
- `/review --branch feature/xyz` - Review changes in a specific branch

## Output Format

```markdown
## Code Review Summary

### Overview
Brief description of what this PR/change does...

### Changes Reviewed
- `src/file1.js` - Description of changes
- `src/file2.js` - Description of changes

### Findings

#### Issues (Must Fix)
1. **[file.js:42]** Description of critical issue...

#### Warnings (Should Fix)
1. **[file.js:15]** Description of warning...

#### Suggestions (Nice to Have)
1. **[file.js:88]** Suggestion for improvement...

### Overall Assessment
Summary and recommendation (Approve / Request Changes / Needs Discussion)
```
