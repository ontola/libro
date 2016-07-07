const DELAY = 1000;

module.exports = {
  'Test homepage': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', DELAY)
      .assert.containsText('.Box__content p',
        'Lorem ipsum')
      .end();
  },
};
