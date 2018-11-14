import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { subjectType, withLinkCtx } from 'link-redux';

import { retrievePath } from '../../helpers/iris';
import { absoluteRouterLocation } from '../../helpers/paths';

import './LDLink.scss';

class LDLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    location: PropTypes.string,
    subject: subjectType,
    theme: PropTypes.oneOf([
      'default',
      'parent',
    ]),
    title: PropTypes.string,
  };

  static defaultProps = {
    theme: 'default',
  };

  render() {
    const {
      className,
      children,
      location,
      subject,
      theme,
      title,
    } = this.props;

    // TODO: bugsnag
    if (!subject) return 'LDLINK NO SUBJECT';
    const href = retrievePath(subject.value);

    return (
      <Link
        className={`${className || `LDLink__${theme}`} ${location === href ? 'LDLink__active' : ''}`}
        title={title}
        to={href}
      >
        {children}
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  location: absoluteRouterLocation(state),
});

export default connect(mapStateToProps)(withLinkCtx(LDLink));
