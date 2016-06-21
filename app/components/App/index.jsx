// @flow
import './app.scss';
import React, { PropTypes } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';
import { HoverCard } from '../';

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
      <HoverCard />
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
