import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import React from 'react';

import AllWithProperty from '../../../components/AllWithProperty';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { containerTopology } from '../../../topologies/Container';

const useStyles = makeStyles<LibroTheme>((theme) => ({
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
      <Typography
        className={classes.title}
        variant="h2"
      >
        {title.value}
      </Typography>
      <AllWithProperty label={sales.sections} />
    </Grid>
  );
};

MoreInformationBlockContainer.type = sales.MoreInformationBlock;

MoreInformationBlockContainer.topology = containerTopology;

export default MoreInformationBlockContainer;
