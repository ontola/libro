import './app.scss';
import React, { PropTypes } from 'react';
import { Navbar } from '../';
import { RouteTransition } from 'react-router-transition';

function App({ location, children }) {
  return (
    <div>
      <Navbar location={location} />
      {
        /*
        <RouteTransition
          pathname={location.pathname}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
        */
      }
      <div className="page">
        <div className="page__wrapper">
          {children}
        </div>
      </div>
      {
        /*
        </RouteTransition>
        */
      }
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
