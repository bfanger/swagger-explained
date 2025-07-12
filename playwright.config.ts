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
      process.platform === "darwin" ? "npm run build && " : ""
    } npm run preview -- --port 5173`,
  },
  ...(CI
    ? {
        projects: [
          { name: "Chrome", use: { ...devices["Desktop Chrome"] } },
          { name: "Firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "Safari", use: { ...devices["Desktop Safari"] } },
        ],
      }
    : {}),
};

export default config;
