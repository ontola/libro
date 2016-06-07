import './app.scss';
import React, { PropTypes } from 'react';
import { Navbar } from '../';

function App({ location, children }) {
  return (
    <div>
      <Navbar location={location} />
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
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

App.defaultProps = {
  children: [],
  location: [],
};

export default App;
