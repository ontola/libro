import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PropertyBase } from 'link-redux';

const propTypes = {
  label: PropTypes.string,
};

class LDLink extends PropertyBase {
  getLDLinkHref() {
    return new URL(this.context.schemaObject['@id']).pathname;
  }

  render() {
    return (
      <Link to={this.getLDLinkHref()}>
        {this.props.children}
      </Link>
    );
  }
}

LDLink.contextTypes = {
  schemaObject: PropTypes.object,
};
LDLink.propTypes = propTypes;

export default LDLink;
