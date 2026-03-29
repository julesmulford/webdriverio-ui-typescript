import { LoginPage } from '../../src/pages/login.page';
import { testData } from '../../src/data/test-data';

describe('Login Tests @regression', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.navigate();
  });

  it('should display login form elements @smoke', async () => {
    await expect($('input[name="username"]')).toBeDisplayed();
    await expect($('input[name="password"]')).toBeDisplayed();
    await expect($('button[type="submit"]')).toBeDisplayed();
  });

  it('should login successfully with valid credentials @smoke', async () => {
    const { username, password } = testData.users.admin();
    await loginPage.login(username, password);
    await loginPage.assertLoggedIn();
  });

  it('should show error for invalid password', async () => {
    const { username } = testData.users.admin();
    await loginPage.login(username, 'wrongpassword');
    await loginPage.assertErrorVisible();
  });

  it('should show error for empty fields', async () => {
    await loginPage.clickSubmit();
    const errors = await loginPage.getRequiredFieldErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should show error for invalid credentials', async () => {
    const { username, password } = testData.users.invalid();
    await loginPage.login(username, password);
    await loginPage.assertErrorVisible();
  });
});
