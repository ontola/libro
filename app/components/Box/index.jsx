import React, { PropTypes } from 'react';

import {
  Card,
  CardContent,
} from 'components';

const propTypes = {
  children: PropTypes.node,
};

const Box = ({
  children,
}) => (
  <Card>
    <CardContent>{children}</CardContent>
  </Card>
);


Box.propTypes = propTypes;

export default Box;
