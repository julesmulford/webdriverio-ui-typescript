export class SideMenuComponent {
  private readonly sidePanel = 'nav.oxd-sidepanel';

  async navigateTo(menuItem: string): Promise<void> {
    const panel = await $(this.sidePanel);
    const link = await panel.$(`=${menuItem}`);
    await link.click();
    await browser.pause(500);
  }

  async navigateToPIM(): Promise<void> {
    await this.navigateTo('PIM');
  }

  async navigateToLeave(): Promise<void> {
    await this.navigateTo('Leave');
  }

  async navigateToRecruitment(): Promise<void> {
    await this.navigateTo('Recruitment');
  }

  async navigateToMyInfo(): Promise<void> {
    await this.navigateTo('My Info');
  }

  async assertMenuVisible(): Promise<void> {
    await expect(await $(this.sidePanel)).toBeDisplayed();
  }
}
