import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import './Iframe.scss';

const propTypes = {
  location: PropTypes.string,
  title: PropTypes.string,
};

const identifier = 'iframe';
const loaderStyle = {
  left: '1em',
  position: 'absolute',
  top: '1em',
  zIndex: 1,
};

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.hideLoader = this.hideLoader.bind(this);
    this.state = {
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.showLoader();
    }
  }

  hideLoader() {
    this.setState({
      loading: false,
    });
  }

  loadComponent() {
    return this.state.loading && <FontAwesome spin name="spinner" style={loaderStyle} />;
  }

  showLoader() {
    this.setState({
      loading: true,
    });
  }

  render() {
    const { location, title } = this.props;
    return (
      <div className="Iframe__Wrapper">
        <Helmet title={title} />
        {this.loadComponent()}
        <iframe
          id={identifier}
          referrerPolicy="no-referrer-when-downgrade"
          src={location}
          title="Argu contents"
          onLoad={this.hideLoader}
        >
          Oeps! Jouw browser ondersteunt geen iframe elementen. Probeer een andere browser.
        </iframe>
      </div>
    );
  }
}

Iframe.propTypes = propTypes;

export default connect(state => ({
  location: state.getIn(['iframe', 'location']),
  title: state.getIn(['iframe', 'metadata', 'title']),
}))(Iframe);
