// @flow
import './navigation.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  fullWidth: PropTypes.bool,
};

const defaultProps = {
  links: [],
  fullWidth: false,
};

const Navigation = ({ fullWidth, links }) => {
  const navClassName = classNames({
    Navigation,
    'Navigation--fullwidth': fullWidth,
    'Navigation--default': !fullWidth,
  });

  const generateLinks = links.map(link => (
    <Link
      onlyActiveOnIndex
      key={link.to}
      className="Navigation__link"
      activeClassName="Navigation__link--active"
      to={link.to}
      children={link.label}
    />
  ));

  return (
    <nav className={navClassName}>
      <div className="Navigation__container">
        {generateLinks}
      </div>
    </nav>
  );
};

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
