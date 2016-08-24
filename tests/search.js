/* eslint no-magic-numbers: 0 */
const DELAY = 2000;

module.exports = {
  'Do a search for \'visserij\'': (browser) => {
    browser
      .url(`${browser.launch_url}/`)
      .click('.Navbar__search')
      .setValue('.sk-search-box__text', 'visserij')
      .submitForm('.sk-search-box form')
      .pause(DELAY)
      .assert.containsText(
        '.sk-hits .Box:first-child .Box__content-main',
        'visserij')
      .end();
  },
};


module.exports = {
  'Check filter drawer on narrow screens': (browser) => {
    browser
      .url(`${browser.launch_url}/`)
      .click('.Navbar__search')
      .setValue('.sk-search-box__text', 'visserij')
      .submitForm('.sk-search-box form')
      .resizeWindow(400, 1000)
      .click('.Search__drawer-action button')
      .waitForElementVisible('.Drawer__container', DELAY)
      .click('.sk-reset-filters')
      .pause(DELAY)
      .click('.Drawer__action--close button')
      .pause(DELAY)
      .assert.cssClassPresent('.Drawer', 'Drawer--hide')
      .end();
  },
};
