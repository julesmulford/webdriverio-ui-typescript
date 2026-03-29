import { testData } from '../../src/data/test-data';

/**
 * Log in as the admin user via the UI.
 * Called in `before` / `beforeEach` hooks for suites that require authentication.
 */
export async function loginAsAdmin(): Promise<void> {
  const { username, password } = testData.users.admin();
  await browser.url('/web/index.php/auth/login');
  await $('input[name="username"]').waitForDisplayed({ timeout: 15000 });
  await $('input[name="username"]').setValue(username);
  await $('input[name="password"]').setValue(password);
  await $('button[type="submit"]').click();
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/dashboard/index'),
    { timeout: 15000, timeoutMsg: 'Login did not redirect to dashboard' }
  );
}
