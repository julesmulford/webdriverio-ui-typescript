# webdriverio-ui-typescript

WebdriverIO 8 UI test framework for OrangeHRM — TypeScript, Page Object Model, Allure reporting.

## Suggested GitHub Repo Name

`webdriverio-ui-typescript`

## Prerequisites

- Node.js 20+
- npm 10+
- Google Chrome (latest) — ChromeDriver is installed automatically via `chromedriver` npm package

## Installation

```bash
npm ci
```

## Running Tests

```bash
# All tests (headless Chrome)
npm test

# Smoke suite only
npm run test:smoke

# Regression suite only
npm run test:regression

# Headed browser (visible Chrome)
npm run test:headed
```

## Allure Reporting

```bash
npm run allure:generate
npm run allure:open
```

## Type Check & Lint

```bash
npm run typecheck
npm run lint
npm run format:check
```

## Architecture

```
webdriverio-ui-typescript/
├── src/
│   ├── pages/           # Page Object classes
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── dashboard.page.ts
│   │   ├── employee-list.page.ts
│   │   └── add-employee.page.ts
│   ├── components/      # Reusable UI components
│   │   └── side-menu.component.ts
│   └── data/            # Test data builders & factories
│       ├── employee.builder.ts
│       └── test-data.ts
├── test/
│   ├── specs/           # Test specifications
│   │   ├── login.spec.ts
│   │   ├── dashboard.spec.ts
│   │   ├── employee.spec.ts
│   │   └── navigation.spec.ts
│   └── support/
│       └── auth.ts      # loginAsAdmin() helper
├── wdio.conf.ts         # WebdriverIO configuration
├── tsconfig.json
└── package.json
```

### Design Principles

| Principle | Implementation |
|-----------|----------------|
| Page Object Model | `BasePage` → `LoginPage`, `DashboardPage`, `EmployeeListPage`, `AddEmployeePage` |
| Async/await | All browser interactions are async — no implicit returns |
| Unique test data | `EmployeeBuilder` uses `randomUUID()` suffix per run |
| Auth helper | `loginAsAdmin()` called in `before` hooks — one login per suite |
| Retry safety | `mochaOpts.retries: 2` in CI, 0 locally |
| Failure evidence | `browser.takeScreenshot()` on test failure via `afterTest` hook |
| Allure reporting | `@wdio/allure-reporter` step-level reporting |
| Tag filtering | `@smoke` / `@regression` in test titles, filtered via `--mochaOpts.grep` |
| CI/CD | GitHub Actions: typecheck → lint → smoke → regression |

## Test Coverage

| File | Tests | Tags |
|------|-------|------|
| `login.spec.ts` | 5 | smoke, regression |
| `dashboard.spec.ts` | 3 | smoke, regression |
| `employee.spec.ts` | 5 | smoke, regression |
| `navigation.spec.ts` | 4 | regression |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
APP_BASE_URL=https://opensource-demo.orangehrmlive.com
BROWSER_HEADLESS=true
```

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **quality-checks** — `tsc --noEmit`, ESLint, Prettier
2. **smoke-tests** — `--mochaOpts.grep @smoke` in headless Chrome
3. **regression-tests** — `--mochaOpts.grep @regression` in headless Chrome
4. **allure-report** — generates HTML report from regression results
5. Uploads: Allure results, screenshots as artifacts

## WebdriverIO vs Playwright

| Aspect | WebdriverIO | Playwright |
|--------|-------------|------------|
| Protocol | WebDriver (W3C) / BiDi | CDP / BiDi |
| Multi-browser | Appium, Sauce Labs, BrowserStack native | Chromium, Firefox, WebKit |
| Config | `wdio.conf.ts` | `playwright.config.ts` |
| Assertions | `expect-webdriverio` | `@playwright/test` expect |
| Reporters | Modular (spec, allure, dot…) | Built-in HTML + third-party |
| Mobile | First-class Appium integration | Limited |
