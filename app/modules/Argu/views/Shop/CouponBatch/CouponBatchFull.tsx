import { Grid } from '@mui/material';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import AllWithProperty from '../../../../Common/components/AllWithProperty';
import CardContent from '../../../../Common/components/Card/CardContent';
import CardDivider from '../../../../Common/components/Card/CardDivider';
import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import { fullResourceTopology } from '../../../../Common/topologies';
import { CardMain } from '../../../../Common/topologies/Card';
import Container from '../../../../Common/topologies/Container';
import argu from '../../../ontology/argu';

const CouponBatchFull: FC = () => (
  <Container>
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
          <AllWithProperty label={argu.coupons} />
        </Grid>
        <CardDivider margin />
        <Heading size={HeadingSize.LG}>
          <Resource subject={argu.usedCoupons} />
        </Heading>
        <Grid
          container
          spacing={2}
        >
          <AllWithProperty label={argu.usedCoupons} />
        </Grid>
      </CardContent>
    </CardMain>
  </Container>
);

CouponBatchFull.type = argu.CouponBatch;

CouponBatchFull.topology = fullResourceTopology;

export default register(CouponBatchFull);
