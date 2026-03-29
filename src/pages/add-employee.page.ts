import { BasePage } from './base.page';

export class AddEmployeePage extends BasePage {
  private readonly firstNameInput = 'input[name="firstName"]';
  private readonly middleNameInput = 'input[name="middleName"]';
  private readonly lastNameInput = 'input[name="lastName"]';
  private readonly saveButton = 'button[type="submit"]';
  private readonly pageTitle = '.orangehrm-main-title';

  async assertOnPage(): Promise<void> {
    await this.waitForUrl('/pim/addEmployee');
    await expect(await this.getElement(this.pageTitle)).toHaveText(
      expect.stringContaining('Add Employee')
    );
  }

  async fillFirstName(name: string): Promise<void> {
    const input = await this.getElement(this.firstNameInput);
    await input.clearValue();
    await input.setValue(name);
  }

  async fillMiddleName(name: string): Promise<void> {
    const input = await this.getElement(this.middleNameInput);
    await input.clearValue();
    await input.setValue(name);
  }

  async fillLastName(name: string): Promise<void> {
    const input = await this.getElement(this.lastNameInput);
    await input.clearValue();
    await input.setValue(name);
  }

  async fillEmployeeDetails(
    firstName: string,
    middleName: string,
    lastName: string
  ): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillMiddleName(middleName);
    await this.fillLastName(lastName);
  }

  async clickSave(): Promise<void> {
    await (await this.getElement(this.saveButton)).click();
  }
}
