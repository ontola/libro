import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Link from '../Link';
import Heading from '../Heading';
import Card from '../../topologies/Card';

import './Widget.scss';

const propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  // Makes tite of widget link to destination
  to: PropTypes.string,
};

const Widget = ({
  children,
  description,
  title,
  to,
}) => (
  <div className="Widget">
    <Heading size="2">
      {to && (
      <Link className="Widget__link" to={to}>
        {title} <FontAwesome className="Widget__chevron" name="chevron-right" />
      </Link>
      )}
      {!to && title}
    </Heading>
    <div className="Widget__description">{description}</div>
    <Card>{children}</Card>
  </div>
);

Widget.propTypes = propTypes;

export default Widget;
