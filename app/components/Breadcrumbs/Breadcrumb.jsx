import PropTypes from 'prop-types';
import React from 'react';

import './Breadcrumbs.scss';
import LDLink from '../LDLink';

const propTypes = {
  image: PropTypes.node,
  label: PropTypes.node,
  title: PropTypes.string,
};

/**
 * A single part of a BreadcrumbsBar
 * @returns {component} Component
 */
class Breadcrumb extends React.PureComponent {
  render() {
    return (
      <LDLink className="Breadcrumb" title={this.props.title}>
        {this.props.image}
        <div className="Breadcrumb__text">
          {this.props.label}
        </div>
      </LDLink>
    );
  }
}

Breadcrumb.propTypes = propTypes;

export default Breadcrumb;
