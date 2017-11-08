import React, { PropTypes } from 'react';

import Card, {
  CardContent,
} from '../Card';
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
