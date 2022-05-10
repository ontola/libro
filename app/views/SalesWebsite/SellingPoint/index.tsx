import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import { LibroTheme, Margin } from '../../../themes/themes';
import ontola from '../../../ontology/ontola';
import Link from '../../../components/Link';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  card: {
    '$wrapper:hover &, $wrapper:focus &': {
      boxShadow: '0px 1px 3.6px rgba(0, 0, 0, 0.06), 0px 2.9px 10px rgba(0, 0, 0, 0.039), 0px 6.9px 24.1px rgba(0, 0, 0, 0.03), 0px 23px 80px rgba(0, 0, 0, 0.021);',
    },
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 9px 107px rgba(0, 0, 0, 0.12), 0px 2.01027px 23.8999px rgba(0, 0, 0, 0.0715329), 0px 0.598509px 7.11561px rgba(0, 0, 0, 0.0484671);',
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSizes.medium,
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(Margin.Large),
    textAlign: 'center',
    transition: 'box-shadow 100ms ease-in-out',
    width: '100%',
  },
  icon: {
    left: '-1.5rem',
    position: 'absolute',
    top: '-1.5rem',
    [theme.breakpoints.down('sm')]: {
      left: '-.5rem',
    },
  },
  wrapper: {
    '&:hover, &:focus': {
      transform: 'scale(0.95)',
    },
    position: 'relative',
    transition: 'transform 100ms ease-in-out',
    [theme.breakpoints.down('sm')]: {
      paddingInline: '1rem',
    },
  },
}));

const SellingPoint: FC = () => {
  const classes = useStyles();
  const [text] = useStrings(schema.text);
  const [href] = useStrings(ontola.href);

  return (
    <Link
      className={classes.wrapper}
      to={href}
    >
      <Property
        className={classes.icon}
        label={schema.image}
      />
      <div className={classes.card}>
        {text}
      </div>
    </Link>
  );
};

SellingPoint.type = sales.SellingPoint;
SellingPoint.topology = allTopologies;

export default register(SellingPoint);
