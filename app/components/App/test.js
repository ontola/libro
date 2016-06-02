import React from 'react';
import { assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import App from './App';

describe("The app", function() {
  it("contains a div", function() {
    // this test is a test
    assert.equal(3, '3', '== coerces values to strings');
  });
});
