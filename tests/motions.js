const DELAY = 1000;

module.exports = {
  'Go to a motion': (browser) => {
    browser
      .url(`${browser.launch_url}/motions`)
      .waitForElementVisible('body', DELAY)
      .assert.title('Moties')
      .pause(DELAY)
      .waitForElementVisible('.List', DELAY)
      .assert.containsText(
        '.List .Card:first-child a',
        'Het Heroverwegen van de positie van de toezichthouder'
      )
      .end();
  },
};
