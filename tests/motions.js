const DELAY = 1000;

module.exports = {
  'Go to a motion': (browser) => {
    browser
      .url('http://localhost:3001/motions')
      .waitForElementVisible('body', DELAY)
      .pause(DELAY)
      .waitForElementVisible('.motions__list__item', DELAY)
      .end();
  },
};
