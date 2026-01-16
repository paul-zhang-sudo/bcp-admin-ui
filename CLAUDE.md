# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BCP Admin UI is an enterprise admin dashboard built with Vue 2.x + Element UI. It provides data integration, task scheduling, and permission management for the BCP (Business Cloud Platform) system.

## Common Commands

```bash
# Development
npm run dev              # Start dev server on port 9528

# Build
npm run build:prod       # Production build
npm run build:uat        # UAT environment build
npm run build:stage      # Staging build

# Code Quality
npm run lint             # ESLint check and auto-fix

# Testing
npm run test:unit        # Run unit tests
npm run test:ci          # Lint + unit tests (CI pipeline)
```

## Architecture

### Authentication & Permission Flow

1. **Login**: User credentials → `/services/fwcore/login` → Token stored in cookies
2. **Route Guard** (`src/permission.js`): Intercepts navigation, validates token
3. **Dynamic Routes**: After login, `user/getInfo` fetches user menus → `permission/generateRoutes` creates routes dynamically from backend menu config
4. **Token Header**: All API requests include `b-token` header via axios interceptor

### State Management (Vuex)

```
src/store/
├── modules/
│   ├── user.js        # User info, token, login/logout actions
│   ├── permission.js  # Dynamic route generation from backend menus
│   ├── app.js         # Sidebar state, device type
│   └── settings.js    # UI settings (fixedHeader, etc.)
└── getters.js         # Computed state accessors
```

### API Pattern

APIs use a centralized request wrapper (`src/utils/request.js`) with:
- Base URL from `VUE_APP_BASE_API` env variable
- Auto token injection via interceptor
- 403/550 error handling with auto-redirect to login

API modules follow this pattern:
```javascript
import request from '@/utils/request'
const URL = { resource: '/services/fwcore/resource' }

export function getList(params) {
  return request({ url: URL.resource, method: 'GET', params })
}
```

### Layout Structure

```
src/layout/
├── index.vue          # Main layout wrapper (Sidebar + Main)
└── components/
    ├── Sidebar/       # Dynamic menu from permission routes
    ├── Navbar.vue     # Top navigation bar
    └── AppMain.vue    # Router view container
```

### View Module Pattern

Each feature module in `src/views/` typically contains:
- `index.vue` - Main page with data table
- Dialog components for add/edit forms
- Corresponding API file in `src/api/`

### Environment Configuration

| File | API Base URL |
|------|--------------|
| `.env.development` | `http://localhost:8819` |
| `.env.production` | Production server |
| `.env.uat` | UAT environment |

### Key Directories

- `src/api/` - API interface definitions (30+ modules)
- `src/views/` - Page components (35+ feature modules)
- `src/components/` - Shared components (Cron editor, ExportExcel, etc.)
- `src/utils/` - Utilities (request wrapper, auth, validation)
- `mock/` - Mock server for development

## Backend API

The backend runs on port 8819. API paths follow pattern: `/services/fwcore/{resource}`

Common endpoints:
- Auth: `/services/fwcore/login` (POST/DELETE)
- Users: `/services/fwcore/users/*`
- Current user: `/services/fwcore/users/login-user`
