import './LinkList.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

const defaultProps = {
  links: [],
};

const LinkList = ({ links }) => {
  const generateLinks = links.map((link, i) => (
    <Link
      onlyActiveOnIndex
      key={i}
      className="LinkList__link"
      activeClassName="LinkList__link--active"
      to={link.to}
      children={link.label}
    />
  ));

  return (
    <nav role="navigation" className="LinkList" children={generateLinks} />
  );
};

LinkList.propTypes = propTypes;
LinkList.defaultProps = defaultProps;

export default LinkList;
