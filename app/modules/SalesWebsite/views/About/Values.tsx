import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  array,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../../Common/theme/types';
import { allTopologies } from '../../../../topologies';
import sales from '../../ontology/sales';

const ITEM_PADDING = 10;
const ITEM_BOTTOM_PADDING = 20;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    margin: 'auto',
    width: 'min(100%, 1440px)',
  },
  item: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      '&:nth-child(odd)': {
        '& h3': {
          color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
      },
    },
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      '&:first-child, &:last-child': {
        '& h3': {
          color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
      },
    },
    '& h3': {
      color: theme.palette.primary.main,
    },
    padding: theme.spacing(ITEM_PADDING),
    paddingBottom: theme.spacing(ITEM_BOTTOM_PADDING),
  },
}));

const Values: FC = () => {
  const classes = useStyles();
  const [heading] = useProperty(schema.name);
  const valueMembers = useIds(array(sales.values));

  return (
    <React.Fragment>
      <Typography
        align="center"
        variant="h2"
      >
        {heading.value}
      </Typography>
      <Grid
        container
        className={classes.container}
      >
        {valueMembers.map((value) => (
          <Grid
            item
            className={classes.item}
            key={value.value}
            md={6}
            sm={12}
          >
            <Resource subject={value} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

Values.type = sales.Values;
Values.topology = allTopologies;

export default register(Values);
