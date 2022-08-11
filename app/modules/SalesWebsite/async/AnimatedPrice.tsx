import { makeStyles } from '@mui/styles';
import { animated, useSpring } from '@react-spring/web';
import React from 'react';

import { LibroTheme, Margin } from '../../Kernel/lib/themes';
import type { AnimatedPriceProps } from '../components/AnimatedPrice';
import { PricingInterval } from '../lib/PricingInterval';

interface StyleProps {
  color: string;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  priceUnit: {
    color: ({ color }) => color,
    display: 'inline',
    fontSize: '2rem',
    marginInlineEnd: theme.spacing(Margin.Medium),
  },
}));

const buildPrice = (price: number): string => `€ ${Math.round(price)},-`;

const AnimatedPrice = ({
  color,
  interval,
  priceMonthly,
  priceStatic,
  priceYearly,
}: AnimatedPriceProps): JSX.Element => {
  const classes = useStyles({ color });
  const animatedVal = useSpring({ price: interval === PricingInterval.Monthly ? priceMonthly : priceYearly });

  return (
    <animated.span className={classes.priceUnit}>
      {priceStatic ?? animatedVal.price.to(buildPrice)}
    </animated.span>
  );
};

export default AnimatedPrice;
