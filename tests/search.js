/* eslint no-magic-numbers: 0 */
const DELAY = 2000;

module.exports = {
  'Do a search for visserij': (browser) => {
    browser
      .url(`${browser.launch_url}/`)
      .click('.Navbar__search')
      .setValue('.sk-search-box__text', 'visserij')
      .submitForm('.sk-search-box form')
      .pause(DELAY)
      .assert.title('Zoeken')
      .assert.visible('.Search__hits')
      .assert.containsText(
        '.sk-hits .Card:first-child .Box__content-main',
        'visserij')
      .end();
  },

  'Check filter drawer on narrow screens': (browser) => {
    browser
      .url(`${browser.launch_url}/`)
      .click('.Navbar__search')
      .setValue('.sk-search-box__text', 'visserij')
      .submitForm('.sk-search-box form')
      .resizeWindow(400, 1000)
      .assert.visible('.Search__drawer-action button')
      .click('.Search__drawer-action button')
      .pause(DELAY)
      .waitForElementVisible('.Drawer__container', DELAY)
      .click('.sk-reset-filters')
      .pause(DELAY)
      .click('.Drawer__action--close button')
      .assert.cssClassPresent('.Drawer', 'Drawer--hide')
      .end();
  },
};
