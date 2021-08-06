import { Grid } from '@material-ui/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import Heading, { HeadingSize } from '../../../components/Heading';
import argu from '../../../ontology/argu';
import { CardMain } from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

export interface CouponBatchFullProps {
  renderPartOf: boolean;
}

const CouponBatchFull: FC<CouponBatchFullProps> = ({
  renderPartOf,
}) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
    <CardMain>
      <CardContent endSpacing>
        <Property label={schema.name} />
        <Heading size={HeadingSize.LG}>
          <Resource subject={argu.coupons} />
        </Heading>
        <Grid
          container
          spacing={2}
        >
          <Property
            label={argu.coupons}
            limit={Infinity}
          />
        </Grid>
        <CardDivider margin />
        <Heading size={HeadingSize.LG}>
          <Resource subject={argu.usedCoupons} />
        </Heading>
        <Grid
          container
          spacing={2}
        >
          <Property
            label={argu.usedCoupons}
            limit={Infinity}
          />
        </Grid>
      </CardContent>
    </CardMain>
  </Container>
);

CouponBatchFull.type = argu.CouponBatch;

CouponBatchFull.topology = fullResourceTopology;

export default register(CouponBatchFull);
