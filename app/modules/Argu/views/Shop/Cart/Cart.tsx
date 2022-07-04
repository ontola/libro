import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { register, useProperty } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import Collection from '../../../../Collection/components';
import Progress from '../../../../Common/components/Progress';
import { tryParseInt } from '../../../../Common/lib/numbers';
import { parentTopology } from '../../../../Common/topologies/BreadcrumbsBar';
import { containerTopology } from '../../../../Common/topologies/Container';
import argu from '../../../ontology/argu';

import { useCartProgressFormatter } from './helpers';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Cart = () => {
  const [budgetMax] = useProperty(argu.budgetMax);
  const [totalPrice] = useProperty(schema.totalPaymentDue);
  const classes = useStyles();
  const totalPriceInt = tryParseInt(totalPrice) ?? 0;
  const budgetMaxInt = tryParseInt(budgetMax);
  const formatLabel = useCartProgressFormatter();

  if (totalPriceInt === 0) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <Collection
        hideHeader
        display="card"
        label={argu.cartDetails}
      />
      <Container maxWidth="xl">
        {!!budgetMaxInt && (
          <Progress
            endSpacing
            formatLabel={formatLabel}
            max={budgetMaxInt}
            min={0}
            value={totalPriceInt}
          />
        )}
      </Container>
    </div>
  );
};

Cart.type = argu.Cart;

Cart.topology = allTopologiesExcept(containerTopology, parentTopology);

export default register(Cart);
