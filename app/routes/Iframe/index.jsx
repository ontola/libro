import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

const propTypes = {
  location: PropTypes.string,
  title: PropTypes.string,
};

const identifier = 'iframe';

const Iframe = ({ location, title }) => (
  <div>
    <Helmet title={title} />
    <iframe
      id={identifier}
      referrerpolicy="no-referrer-when-downgrade"
      src={location}
      style={{
        height: '100%',
        position: 'absolute',
        width: '100%',
      }}
    >
      Oeps! Jouw browser ondersteunt geen iframe elementen. Probeer een andere browser.
    </iframe>
  </div>
);

Iframe.propTypes = propTypes;

export default connect(
    state => ({
      location: state.getIn(['iframe', 'location']),
      title: state.getIn(['iframe', 'metadata', 'title']),
    })
)(Iframe);
