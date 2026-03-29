import { SideMenuComponent } from '../../src/components/side-menu.component';
import { loginAsAdmin } from '../support/auth';

describe('Navigation Tests @regression', () => {
  let sideMenu: SideMenuComponent;

  before(async () => {
    await loginAsAdmin();
  });

  beforeEach(async () => {
    sideMenu = new SideMenuComponent();
    await browser.url('/web/index.php/dashboard/index');
  });

  it('should navigate to PIM module @smoke', async () => {
    await sideMenu.navigateToPIM();
    expect(await browser.getUrl()).toContain('/pim/');
  });

  it('should navigate to Leave module', async () => {
    await sideMenu.navigateToLeave();
    expect(await browser.getUrl()).toContain('/leave/');
  });

  it('should navigate to Recruitment module', async () => {
    await sideMenu.navigateToRecruitment();
    expect(await browser.getUrl()).toContain('/recruitment/');
  });

  it('should navigate to My Info module', async () => {
    await sideMenu.navigateToMyInfo();
    expect(await browser.getUrl()).toContain('/pim/viewMyDetails');
  });
});
