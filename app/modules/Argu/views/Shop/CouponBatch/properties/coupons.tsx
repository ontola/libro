import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SomeTerm, isNamedNode } from '@ontologies/core';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../../topologies';
import LinkLoader from '../../../../../Kernel/components/LinkLoader';
import { useContainerToArr } from '../../../../../Kernel/hooks/useContainerToArr';
import argu from '../../../../ontology/argu';

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
  const [items, loading] = useContainerToArr(isNamedNode(linkedProp) ? linkedProp : undefined);

  if (isNamedNode(linkedProp)) {
    if (loading) {
      return <LinkLoader />;
    }

    return (
      <React.Fragment>
        {items.map((item) => (
          <Grid
            item
            key={item.value}
          >
            <div className={styles.coupon}>
              <Resource subject={item}>
                <Property label={argu.token} />
              </Resource>
            </div>
          </Grid>
        ))}
      </React.Fragment>
    );
  }

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
