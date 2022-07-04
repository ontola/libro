import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { animated, useSpring } from '@react-spring/web';
import {
  FC,
  register,
  useNumbers,
  useStrings,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LibroTheme, Margin } from '../../../Kernel/lib/themes';
import { allTopologies } from '../../../../topologies';
import { salesMessages } from '../../../../translations/messages';
import sales from '../../ontology/sales';

interface StyleProps {
  color: string;
}

export enum PricingInterval {
  Monthly = 1,
  Yearly,
}

export interface PriceProps {
  interval: PricingInterval;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  interval: {
    display: 'inline',
    fontSize: theme.typography.fontSize,
    verticalAlign: 'super',
  },
  priceUnit: {
    color: ({ color }) => color,
    display: 'inline',
    fontSize: '2rem',
    marginInlineEnd: theme.spacing(Margin.Medium),
  },
}));

const buildPrice = (price: number): string => `€ ${Math.round(price)},-`;

const Price: FC<PriceProps> = ({ interval }) => {
  const [priceMonthly] = useNumbers(sales.priceMonthly);
  const [priceYearly] = useNumbers(sales.priceYearly);
  const [priceStatic] = useStrings(sales.priceStatic);

  const [color] = useStrings(schema.color);
  const classes = useStyles({ color });

  const animatedVal = useSpring({ price: interval === PricingInterval.Monthly ? priceMonthly : priceYearly });

  return (
    <React.Fragment>
      <animated.span className={classes.priceUnit}>
        {priceStatic ?? animatedVal.price.to(buildPrice)}
      </animated.span>
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
