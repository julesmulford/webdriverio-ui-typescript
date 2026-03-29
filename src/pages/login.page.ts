import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly submitButton = 'button[type="submit"]';
  private readonly errorMessage = '.oxd-alert-content-text';
  private readonly requiredField = '.oxd-input-field-error-message';

  async navigate(): Promise<void> {
    await this.open('/web/index.php/auth/login');
    await this.waitForVisible(this.submitButton);
  }

  async enterUsername(username: string): Promise<void> {
    const input = await this.getElement(this.usernameInput);
    await input.clearValue();
    await input.setValue(username);
  }

  async enterPassword(password: string): Promise<void> {
    const input = await this.getElement(this.passwordInput);
    await input.clearValue();
    await input.setValue(password);
  }

  async clickSubmit(): Promise<void> {
    await (await this.getElement(this.submitButton)).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSubmit();
  }

  async getErrorMessage(): Promise<string> {
    const el = await this.getElement(this.errorMessage);
    return el.getText();
  }

  async getRequiredFieldErrors(): Promise<WebdriverIO.ElementArray> {
    return this.getElements(this.requiredField);
  }

  async assertOnLoginPage(): Promise<void> {
    await this.waitForUrl('/auth/login');
    await expect(await this.getElement(this.submitButton)).toBeDisplayed();
  }

  async assertLoggedIn(): Promise<void> {
    await this.waitForUrl('/dashboard/index');
  }

  async assertErrorVisible(): Promise<void> {
    await expect(await this.getElement(this.errorMessage)).toBeDisplayed();
  }
}
