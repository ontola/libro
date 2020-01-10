/* global jest */

const React = jest.requireActual('react');

module.exports = {
  ...React,
  memo: (x) => x,
};
