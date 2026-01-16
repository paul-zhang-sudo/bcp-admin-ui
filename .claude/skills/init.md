# Init Skill

Initialize a new CLAUDE.md file with codebase documentation.

## Instructions

When the user runs /init, perform the following steps:

1. Analyze the current codebase structure:
   - Identify the main programming languages used
   - Find the project type (frontend, backend, fullstack, etc.)
   - Locate important configuration files (package.json, tsconfig.json, etc.)
   - Identify the framework being used (Vue, React, Express, etc.)

2. Create a CLAUDE.md file in the project root with the following sections:
   - Project Overview: Brief description of what the project does
   - Tech Stack: List of technologies, frameworks, and libraries used
   - Project Structure: Overview of the directory structure
   - Getting Started: How to install dependencies and run the project
   - Common Commands: Frequently used npm/yarn scripts
   - Code Conventions: Any coding standards observed in the codebase
   - Important Files: Key files that developers should know about

3. Ask the user if they want to add any additional information to the CLAUDE.md file.

## Example Output

```markdown
# Project Name

## Overview
Brief description of the project...

## Tech Stack
- Vue 3
- Vite
- Element Plus
- etc.

## Project Structure
```
src/
├── api/        # API calls
├── components/ # Reusable components
├── views/      # Page components
└── ...
```

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
...
```