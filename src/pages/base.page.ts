/**
 * BasePage provides shared navigation and wait helpers used by all page objects.
 * All interactions are async — WebdriverIO uses a Promise-based API throughout.
 */
export abstract class BasePage {
  protected async open(path: string): Promise<void> {
    await browser.url(path);
  }

  protected async waitForUrl(urlFragment: string): Promise<void> {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(urlFragment),
      { timeout: 15000, timeoutMsg: `URL did not include "${urlFragment}" within timeout` }
    );
  }

  protected async waitForVisible(selector: string): Promise<void> {
    await $(selector).waitForDisplayed({ timeout: 15000 });
  }

  protected async getElement(selector: string): Promise<WebdriverIO.Element> {
    return $(selector);
  }

  protected async getElements(selector: string): Promise<WebdriverIO.ElementArray> {
    return $$(selector);
  }
}
