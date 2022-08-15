import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import React from 'react';

import { containerTopology } from '../../../Common/topologies';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import sales from '../../ontology/sales';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      marginTop: 50,
    },
    width: 'unset',
  },
  title: {
    textAlign: 'right',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      textAlign: 'left',
    },
  },
}));

const MoreInformationBlockContainer = (): JSX.Element => {
  const classes = useStyles();
  const [title] = useProperty(schema.name);

  const styles = useTheme();
  const flexDirection = useMediaQuery(styles.breakpoints.down('md'))
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
