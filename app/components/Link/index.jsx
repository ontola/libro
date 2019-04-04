import { lrsType, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React, { PureComponent } from 'react';
import { Link as DomLink, NavLink } from 'react-router-dom';

import {
  isDifferentWebsite,
  isLocalAnchor,
  retrievePath,
} from '../../helpers/iris';

import './Link.scss';

const propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.oneOf([
      'bold',
      'centered',
      'highlighted-darken',
      'highlighted-lighten',
      'padded',
    ])
  ),
  isIndex: PropTypes.bool,
  lrs: lrsType,
  onClick: PropTypes.func,
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_parent',
    '_top',
    'modal',
  ]),
  theme: PropTypes.oneOf([
    'default',
    'parent',
  ]),
  to: PropTypes.string,
};

const defaultProps = {
  className: 'Link',
  isIndex: true,
  theme: 'default',
};

class Link extends PureComponent {
  constructor(props) {
    super(props);

    this.isActive = this.isActive.bind(this);
  }

  isActive(match, location) {
    const relative = retrievePath(this.props.to);

    return match
      || (!isDifferentWebsite(this.props.to)
        && relative === location.pathname + location.search + location.hash);
  }

  render() {
    const {
      activeClassName,
      children,
      className,
      features,
      isIndex,
      lrs,
      onClick,
      target,
      theme,
      to,
    } = this.props;

    const themeClass = `Link__${theme}`;
    const featuresClass = features ? features.map(f => `Link__${f}`).join(' ') : '';

    if (isDifferentWebsite(to)) {
      return (
        <a
          className={`${className} ${themeClass} ${featuresClass}`}
          href={to}
          rel="nofollow noopener noreferrer"
          target="_blank"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    const path = retrievePath(to);
    const LinkComp = isLocalAnchor(path) ? DomLink : NavLink;

    const clickHandler = target !== 'modal'
      ? onClick
      : (e) => {
        e.preventDefault();
        lrs.actions.ontola.showDialog(NamedNode.find(to));
        if (typeof onClick === 'function') {
          onClick(e);
        }
      };

    return (
      <LinkComp
        activeClassName={activeClassName || 'Link__active'}
        className={`${className} ${themeClass} ${featuresClass}`}
        exact={isIndex}
        isActive={this.isActive}
        target={target}
        to={path}
        onClick={clickHandler}
      >
        {children}
      </LinkComp>
    );
  }
}

Link.defaultProps = defaultProps;
Link.propTypes = propTypes;

export default withLRS(Link);
