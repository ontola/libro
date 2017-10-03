import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import Heading from '../Heading';
import Card from '../Card';

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
      {to &&
        <Link to={to} className="Widget__link">
          {title} <FontAwesome name="chevron-right" className="Widget__chevron" />
        </Link>
      }
      {!to && title}
    </Heading>
    <div className="Widget__description">{description}</div>
    <Card>{children}</Card>
  </div>
);

Widget.propTypes = propTypes;

export default Widget;
