import type { Options } from '@wdio/types';
import * as dotenv from 'dotenv';
dotenv.config();

export const config: Options.Testrunner = {
  runner: 'local',

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },

  specs: ['./test/specs/**/*.spec.ts'],
  exclude: [],

  maxInstances: 5,

  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args:
          process.env.BROWSER_HEADLESS !== 'false'
            ? ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,720']
            : ['--window-size=1280,720'],
      },
    },
  ],

  logLevel: 'warn',
  bail: 0,
  baseUrl: process.env.APP_BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['chromedriver'],

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: process.env.CI ? 2 : 0,
  },

  afterTest: async (_test, _context, { passed }) => {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
