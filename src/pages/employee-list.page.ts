import { BasePage } from './base.page';

export class EmployeeListPage extends BasePage {
  private readonly pageTitle = '.oxd-topbar-header-breadcrumb h6';
  private readonly searchInput = '[placeholder="Type for hints..."]';
  private readonly searchButton = 'button[type="submit"]';
  private readonly addButton = '.orangehrm-header-container button';
  private readonly tableRows = '.oxd-table-body .oxd-table-row';

  async navigate(): Promise<void> {
    await this.open('/web/index.php/pim/viewEmployeeList');
    await this.waitForVisible(this.pageTitle);
  }

  async assertOnPage(): Promise<void> {
    await this.waitForUrl('/pim/viewEmployeeList');
    await expect(await this.getElement(this.pageTitle)).toHaveText(
      expect.stringContaining('Employee Information')
    );
  }

  async searchByName(name: string): Promise<void> {
    const inputs = await this.getElements(this.searchInput);
    await inputs[0].clearValue();
    await inputs[0].setValue(name);
    await (await this.getElement(this.searchButton)).click();
    await browser.pause(1000);
  }

  async clickAddEmployee(): Promise<void> {
    const buttons = await this.getElements(this.addButton);
    for (const btn of buttons) {
      const text = await btn.getText();
      if (text.includes('Add Employee')) {
        await btn.click();
        return;
      }
    }
    throw new Error('Add Employee button not found');
  }

  async getTableRows(): Promise<WebdriverIO.ElementArray> {
    return this.getElements(this.tableRows);
  }

  async assertHasResults(): Promise<void> {
    const rows = await this.getTableRows();
    expect(rows.length).toBeGreaterThan(0);
  }
}
