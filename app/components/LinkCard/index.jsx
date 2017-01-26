import React, { PropTypes } from 'react';

import {
  Card,
  CardContent,
  LDLink,
} from 'components';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    null,
  ]),
};

const LinkCard = ({ children }) => (
  <LDLink>
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </LDLink>
);

LinkCard.propTypes = propTypes;

export default LinkCard;
