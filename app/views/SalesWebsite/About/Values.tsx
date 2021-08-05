import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const ITEM_PADDING = 10;
const ITEM_BOTTOM_PADDING = 20;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    margin: 'auto',
    width: 'min(100%, 1440px)',
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      '&:nth-child(odd)': {
        '& h3': {
          color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
      },
    },
    [theme.breakpoints.up('md')]: {
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
  const [values] = useProperty(sales.values);
  const valueMembers = useResourceProperty(values as Node, rdfs.member);

  return (
    <React.Fragment>
      <Typography align="center" variant="h2">
        {heading.value}
      </Typography>
      <Grid container className={classes.container}>
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
