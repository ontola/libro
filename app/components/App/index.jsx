// @flow
import './app.scss';
import React, { PropTypes } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
};

function App({ children }) {
  return (
    <div>
      <NavbarContainer />
      {children}
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
