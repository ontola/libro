import { Grid } from '@material-ui/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import argu from '../../../ontology/argu';
import { CardMain } from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

export interface CouponBadgeFullProps {
  renderPartOf: boolean;
}

const CouponBadgeFull: FC<CouponBadgeFullProps> = ({
  renderPartOf,
}) => {
  return (
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <CardMain>
        <CardContent endSpacing>
          <Property label={schema.name} />
          <Grid container spacing={2}>
            <Property label={argu.coupons} limit={Infinity} />
          </Grid>
        </CardContent>
      </CardMain>
    </Container>
  );
};

CouponBadgeFull.type = argu.CouponBadge;

CouponBadgeFull.topology = fullResourceTopology;

export default register(CouponBadgeFull);
