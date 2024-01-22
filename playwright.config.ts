import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const CI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  testDir: "./playwright/tests",
  fullyParallel: true,
  forbidOnly: CI,
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  webServer: {
    port: 5173,
    reuseExistingServer: true,
    command: `${
      process.platform === "darwin" ? "npm run build:vite && " : ""
    } npm run preview -- --port 5173`,
  },
  ...(CI
    ? {
        projects: [
          { name: "Chrome", use: { ...devices["Desktop Chrome"] } },
          { name: "Firefox", use: { ...devices["Desktop Firefox"] } },
          // "iPhone" instead of "Desktop Safari" to also run the tests on a small screen.
          { name: "iPhone", use: { ...devices["iPhone 13 Pro"] } },
        ],
      }
    : {}),
};

export default config;
