import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useNumbers,
  useStrings,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { allTopologies } from '../../../../topologies';
import { salesMessages } from '../../../../translations/messages';
import { LibroTheme } from '../../../Kernel/lib/themes';
import AnimatedPrice from '../../components/AnimatedPrice';
import { PricingInterval } from '../../lib/PricingInterval';
import sales from '../../ontology/sales';

export interface PriceProps {
  interval: PricingInterval;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  interval: {
    display: 'inline',
    fontSize: theme.typography.fontSize,
    verticalAlign: 'super',
  },
}));

const Price: FC<PriceProps> = ({ interval }) => {
  const classes = useStyles();

  const [priceMonthly] = useNumbers(sales.priceMonthly);
  const [priceYearly] = useNumbers(sales.priceYearly);
  const [priceStatic] = useStrings(sales.priceStatic);

  const [color] = useStrings(schema.color);

  return (
    <React.Fragment>
      <AnimatedPrice
        color={color}
        interval={interval}
        priceMonthly={priceMonthly}
        priceStatic={priceStatic}
        priceYearly={priceYearly}
      />
      <span className={classes.interval}>
        {!priceStatic && interval === PricingInterval.Monthly && (
          <FormattedMessage {...salesMessages.priceIntervalMonthly} />
        )}
        {!priceStatic && interval === PricingInterval.Yearly && (
          <FormattedMessage {...salesMessages.priceIntervalYearly} />
        )}
      </span>
    </React.Fragment>
  );
};

Price.type = sales.Price;
Price.topology = allTopologies;

export default register(Price);
