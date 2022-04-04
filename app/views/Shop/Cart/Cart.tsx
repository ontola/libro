import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Collection from '../../../components/Collection';
import Progress from '../../../components/Progress';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import {
  allTopologiesExcept,
  containerTopology,
  parentTopology,
} from '../../../topologies';

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
      <Container maxWidth="lg">
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
