import { EmployeeListPage } from '../../src/pages/employee-list.page';
import { AddEmployeePage } from '../../src/pages/add-employee.page';
import { testData } from '../../src/data/test-data';
import { loginAsAdmin } from '../support/auth';

describe('Employee Tests @regression', () => {
  let employeeListPage: EmployeeListPage;
  let addEmployeePage: AddEmployeePage;

  before(async () => {
    await loginAsAdmin();
  });

  beforeEach(async () => {
    employeeListPage = new EmployeeListPage();
    addEmployeePage = new AddEmployeePage();
    await employeeListPage.navigate();
  });

  it('should navigate to employee list @smoke', async () => {
    await employeeListPage.assertOnPage();
  });

  it('should display employee records', async () => {
    await employeeListPage.assertHasResults();
  });

  it('should search for employee by name', async () => {
    await employeeListPage.searchByName('Admin');
    const rows = await employeeListPage.getTableRows();
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should navigate to add employee page', async () => {
    await employeeListPage.clickAddEmployee();
    await addEmployeePage.assertOnPage();
  });

  it('should add a new employee @smoke', async () => {
    const employee = testData.employees.new();
    await employeeListPage.clickAddEmployee();
    await addEmployeePage.assertOnPage();
    await addEmployeePage.fillEmployeeDetails(
      employee.firstName,
      employee.middleName,
      employee.lastName
    );
    await addEmployeePage.clickSave();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/pim/viewPersonalDetails'),
      { timeout: 15000, timeoutMsg: 'Did not redirect to personal details after save' }
    );
  });
});
