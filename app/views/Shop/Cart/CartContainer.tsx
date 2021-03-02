import { makeStyles } from '@material-ui/styles';
import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';
import {
  FormattedMessage,
  FormattedNumber,
} from 'react-intl';

import { ButtonTheme } from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import Progress from '../../../components/Progress';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { Margin } from '../../../themes/themes';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';
import { budgetMessages } from '../../../translations/messages';

const SHINE_RESET = 2000;

export interface CartProps {
  budgetMax: Literal;
  priceCurrency: Literal;
  submitted: boolean;
  totalPrice: Literal;
}

const useStyles = makeStyles((theme: any) => ({
  totalPrice: {
    marginBottom: theme.spacing(Margin.Small),
  },
  totalPriceExceeded: {
    color: theme.palette.error.dark,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(Margin.Small),
  },
  wrapper: {
    bottom: 0,
    float: 'right',
    marginTop: theme.spacing(Margin.Medium),
    position: 'sticky',
  },
}));

const CartContainer: FC<CartProps> = ({
  budgetMax,
  priceCurrency,
  submitted,
  totalPrice,
}) => {
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

  const totalPriceInt = tryParseInt(totalPrice) || 0;
  const budgetMaxInt = tryParseInt(budgetMax);
  const budgetExceeded = budgetMaxInt && totalPriceInt > budgetMaxInt;

  if (submitted) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <CardContent endSpacing>
            <FormattedMessage {...budgetMessages.submitted} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (totalPriceInt === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Card shine={shine}>
        <CardContent endSpacing>
          <div className={budgetExceeded ? styles.totalPriceExceeded : styles.totalPrice}>
            <FormattedNumber
              currency={priceCurrency.value}
              currencyDisplay="narrowSymbol"
              style="currency"
              value={totalPriceInt}
            />
            {budgetMaxInt && (
              <React.Fragment>
                /
                <FormattedNumber
                  currency={priceCurrency.value}
                  currencyDisplay="narrowSymbol"
                  style="currency"
                  value={budgetMaxInt}
                />
              </React.Fragment>
            )}
          </div>
          {budgetMaxInt && (
            <Progress
              endSpacing
              max={budgetMaxInt}
              min={0}
              value={totalPriceInt}
            />
          )}
          <Property label={argu.checkoutAction} theme={ButtonTheme.Submit} />
        </CardContent>
      </Card>
    </div>
  );
};

CartContainer.type = argu.Cart;

CartContainer.topology = containerTopology;

CartContainer.mapDataToProps = {
  budgetMax: argu.budgetMax,
  priceCurrency: schema.priceCurrency,
  submitted: {
    label: argu.submitted,
    returnType: ReturnType.Literal,
  },
  totalPrice: schema.totalPaymentDue,
};

export default register(CartContainer);
