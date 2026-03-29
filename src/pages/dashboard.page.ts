import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private readonly breadcrumb = '.oxd-topbar-header-breadcrumb h6';
  private readonly userDropdownTab = '.oxd-userdropdown-tab';
  private readonly userDropdownMenu = '.oxd-userdropdown-dropdown';
  private readonly quickLaunchItems = '.oxd-quick-launch-card';
  private readonly dashboardWidgets = '.oxd-grid-item';

  async assertOnDashboard(): Promise<void> {
    await this.waitForUrl('/dashboard/index');
    const title = await this.getElement(this.breadcrumb);
    await expect(title).toHaveText(expect.stringContaining('Dashboard'));
  }

  async getPageTitle(): Promise<string> {
    return (await this.getElement(this.breadcrumb)).getText();
  }

  async openUserDropdown(): Promise<void> {
    await (await this.getElement(this.userDropdownTab)).click();
  }

  async getUserDropdownMenu(): Promise<WebdriverIO.Element> {
    return this.getElement(this.userDropdownMenu);
  }

  async getQuickLaunchItems(): Promise<WebdriverIO.ElementArray> {
    return this.getElements(this.quickLaunchItems);
  }

  async getDashboardWidgets(): Promise<WebdriverIO.ElementArray> {
    return this.getElements(this.dashboardWidgets);
  }

  async assertUserDropdownVisible(): Promise<void> {
    await this.openUserDropdown();
    await expect(await this.getUserDropdownMenu()).toBeDisplayed();
  }
}
