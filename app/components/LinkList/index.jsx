import './LinkList.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const defaultProps = {
  links: [],
};

const LinkList = ({ links }) => {
  const generateLinks = links.map((link, i) => (
    <Link
      activeClassName="LinkList__link--active"
      className="LinkList__link"
      key={i}
      onlyActiveOnIndex
      to={link.to}
    >{link.label}
    </Link>
  ));

  return (
    <nav className="LinkList" role="navigation">{generateLinks}</nav>
  );
};

LinkList.propTypes = propTypes;
LinkList.defaultProps = defaultProps;

export default LinkList;
