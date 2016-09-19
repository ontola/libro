import './Widget.scss';
import React, { PropTypes } from 'react';

import { Heading, Card } from 'components';

const propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const Widget = ({
  children,
  description,
  title,
}) => (
  <div className="Widget">
    <Heading size="3">{title}</Heading>
    <div className="Widget__description">{description}</div>
    <Card>{children}</Card>
  </div>
);

Widget.propTypes = propTypes;

export default Widget;
