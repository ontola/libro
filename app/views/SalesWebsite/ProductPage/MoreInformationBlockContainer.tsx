import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Property, useProperty } from 'link-redux';
import * as schema from '@ontologies/schema';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { containerTopology } from '../../../topologies/Container';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
    },
    width: 'unset',
  },
  title: {
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
}));

const MoreInformationBlockContainer = (): JSX.Element => {
  const classes = useStyles();
  const [title] = useProperty(schema.name);

  const styles = useTheme();
  const flexDirection = useMediaQuery(styles.breakpoints.down('sm'))
    ? 'flex-start' : 'flex-end';

  return (
    <Grid
      container
      alignItems={flexDirection}
      className={classes.container}
      direction="column"
    >
      <Typography className={classes.title} variant="h2">{title.value}</Typography>
      <Property label={sales.sections} limit={Infinity} />
    </Grid>
  );
};

MoreInformationBlockContainer.type = sales.MoreInformationBlock;

MoreInformationBlockContainer.topology = containerTopology;

export default MoreInformationBlockContainer;
