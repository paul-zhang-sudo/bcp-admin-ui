# PR Comments Skill

Get and analyze comments from a GitHub pull request.

## Instructions

When the user runs /pr-comments, perform the following steps:

1. **Get the PR number**:
   - If provided as argument (e.g., `/pr-comments 123`), use that number
   - If not provided, try to detect from current branch using `gh pr view --json number`
   - If no PR is found, ask the user for the PR number

2. **Fetch PR comments** using GitHub CLI:
   ```bash
   # Get PR review comments
   gh api repos/{owner}/{repo}/pulls/{pr_number}/comments

   # Get PR conversation comments
   gh api repos/{owner}/{repo}/issues/{pr_number}/comments

   # Get PR reviews
   gh api repos/{owner}/{repo}/pulls/{pr_number}/reviews
   ```

3. **Organize and present the comments**:
   - Group by type (review comments, conversation, reviews)
   - Sort chronologically
   - Show author, date, and content
   - Highlight unresolved comments

4. **Provide a summary**:
   - Total number of comments
   - Key discussion points
   - Action items or unresolved issues
   - Reviewer feedback summary

## Usage Examples

- `/pr-comments` - Get comments from current branch's PR
- `/pr-comments 123` - Get comments from PR #123

## Output Format

```markdown
## PR #123 Comments Summary

### Statistics
- Total Comments: 15
- Review Comments: 8
- Conversation Comments: 7
- Unresolved: 3

### Review Comments

#### @reviewer1 (2024-01-15)
**File:** `src/api/user.js:42`
> Consider adding error handling here...

**Status:** Unresolved

---

#### @reviewer2 (2024-01-15)
**File:** `src/components/Table.vue:88`
> This looks good, but we might want to memoize this...

**Status:** Resolved

### Conversation Comments

#### @maintainer (2024-01-14)
> Please add tests for the new functionality...

### Action Items
1. Address error handling in `src/api/user.js`
2. Add unit tests
3. ...
```
