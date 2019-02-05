import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { subjectType, withLinkCtx } from 'link-redux';

import { retrievePath } from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import { absoluteRouterLocation } from '../../helpers/paths';

import './LDLink.scss';

class LDLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    features: PropTypes.arrayOf([
      PropTypes.oneOf([
        'highlighted-darken',
        'highlighted-lighten',
      ]),
      'padded',
    ]),
    location: PropTypes.string,
    onClick: PropTypes.func,
    subject: subjectType,
    theme: PropTypes.oneOf([
      'default',
      'parent',
    ]),
    title: PropTypes.string,
    /** Overrides the url */
    to: PropTypes.objectOf(NamedNode),
  };

  static defaultProps = {
    theme: 'default',
  };

  render() {
    const {
      className,
      children,
      features,
      location,
      onClick,
      subject,
      theme,
      title,
      to,
    } = this.props;

    if (!subject) {
      handle(new Error('LDLINK NO SUBJECT'));
      return '';
    }
    const href = retrievePath(to ? to.value : subject.value);

    const themeClass = className || `LDLink__${theme}`;
    const activeClass = location === href ? 'LDLink__active' : '';
    const featuresClass = features ? features.map(f => `LDLink__${f}`).join(' ') : '';

    return (
      <Link
        className={`${themeClass} ${activeClass} ${featuresClass}`}
        title={title}
        to={href}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  location: absoluteRouterLocation(state),
});

export { default as LDLinkLabel } from './LDLinkLabel';

export default connect(mapStateToProps)(withLinkCtx(LDLink));
