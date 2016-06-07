import './app.scss';
import React, { PropTypes } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';

function App({ children }) {
  return (
    <div>
      <NavbarContainer />
      <div className="page">
        <div className="page__wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: [],
};

export default App;
