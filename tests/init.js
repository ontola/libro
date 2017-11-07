const DELAY = 1000;

module.exports = {
  'Test homepage': (browser) => {
    browser
      .url(`${browser.launch_url}/`)
      .waitForElementVisible('body', DELAY)
      .assert.containsText(
        '.Box__content p',
        'Lorem ipsum'
      )
      .end();
  },
};
