const DELAY = 1000;

module.exports = {
  'Test website': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', DELAY)
      .end();
  },
};
