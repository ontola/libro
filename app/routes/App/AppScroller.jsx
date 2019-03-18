import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

const AppScroller = ({ children, location }) => {
  const scrollerRef = React.createRef();

  React.useEffect(
    () => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTo(0, 0);
      }
    },
    [location?.pathname]
  );

  return (
    <div
      className="App__scroller"
      ref={scrollerRef}
    >
      {children}
    </div>
  );
};

AppScroller.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(AppScroller);
