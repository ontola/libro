import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../../../ontology/argu';
import { allTopologies } from '../../../../topologies';

export interface CouponsProps {
  linkedProp: SomeTerm;
}

const useStyles = makeStyles(() => ({
  coupon: {
    fontFamily: '"Courier New", monospace',
  },
}));

const Coupons: FC<CouponsProps> = ({
  linkedProp,
}) => {
  const styles = useStyles();

  return (
    <Grid item>
      <div className={styles.coupon}>
        {linkedProp.value}
      </div>
    </Grid>
  );
};

Coupons.type = argu.CouponBatch;

Coupons.topology = allTopologies;

Coupons.property = [
  argu.coupons,
  argu.usedCoupons,
];

export default register(Coupons);
