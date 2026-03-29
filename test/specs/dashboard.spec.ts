import { DashboardPage } from '../../src/pages/dashboard.page';
import { loginAsAdmin } from '../support/auth';

describe('Dashboard Tests @regression', () => {
  let dashboardPage: DashboardPage;

  before(async () => {
    await loginAsAdmin();
  });

  beforeEach(async () => {
    dashboardPage = new DashboardPage();
    await browser.url('/web/index.php/dashboard/index');
  });

  it('should display dashboard after login @smoke', async () => {
    await dashboardPage.assertOnDashboard();
  });

  it('should display user dropdown menu', async () => {
    await dashboardPage.assertUserDropdownVisible();
  });

  it('should display dashboard widgets', async () => {
    const widgets = await dashboardPage.getDashboardWidgets();
    expect(widgets.length).toBeGreaterThan(0);
  });
});
