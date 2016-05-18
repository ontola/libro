var styles = require('./App.scss');
import React, {Component} from 'react';
import Box from '../Box/Box.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Joejoe</h2>
        <Box>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Box>
      </div>
    );
  }
}
