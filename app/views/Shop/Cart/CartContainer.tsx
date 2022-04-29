import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import Progress from '../../../components/Progress';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { LibroTheme, Margin } from '../../../themes/themes';
import { fullResourceTopology } from '../../../topologies';
import Card from '../../../topologies/Card';

import { useCartProgressFormatter } from './helpers';

const SHINE_RESET = 2000;

const useStyles = makeStyles((theme: LibroTheme) => ({
  wrapper: {
    bottom: 0,
    float: 'right',
    margin: theme.spacing(Margin.Medium),
    position: 'sticky',
    zIndex: theme.zIndex.appBar,
  },
}));

const CartContainer = () => {
  const [budgetMax] = useProperty(argu.budgetMax);
  const [totalPrice] = useProperty(schema.totalPaymentDue);

  const styles = useStyles();
  const [shine, setShine] = React.useState(false);
  React.useEffect(() => {
    setShine(true);
    const id = window.setTimeout(
      () => setShine(false),
      SHINE_RESET,
    );

    return () => window.clearTimeout(id);
  }, [totalPrice.value, setShine]);

  const totalPriceInt = tryParseInt(totalPrice) ?? 0;
  const budgetMaxInt = tryParseInt(budgetMax);
  const formatLabel = useCartProgressFormatter();

  if (totalPriceInt === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Card shine={shine}>
        <CardContent endSpacing>
          {budgetMaxInt && (
            <Progress
              endSpacing
              formatLabel={formatLabel}
              max={budgetMaxInt}
              min={0}
              value={totalPriceInt}
            />
          )}
          <Property label={argu.checkoutAction} />
        </CardContent>
      </Card>
    </div>
  );
};

CartContainer.type = argu.Cart;

CartContainer.topology = fullResourceTopology;

export default register(CartContainer);
