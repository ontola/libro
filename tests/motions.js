const DELAY = 1000;

module.exports = {
  'Go to a motion': (browser) => {
    browser
      .url(`${browser.launch_url}/motions`)
      .waitForElementVisible('body', DELAY)
      .pause(DELAY)
      .waitForElementVisible('.motions__list__item', DELAY)
      .end();
  },
};
