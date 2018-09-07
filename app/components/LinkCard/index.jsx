import PropTypes from 'prop-types';
import React from 'react';

import Card, { CardContent } from '../../topologies/Card';
import LDLink from '../LDLink';

const propTypes = {
  children: PropTypes.node,
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
