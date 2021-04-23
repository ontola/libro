import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import { useProperty } from 'link-redux';
import * as schema from '@ontologies/schema';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { containerTopology } from '../../../topologies/Container';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'none',
  },
  buttonText: {
    textAlign: 'right',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
    },
  },
  subtitle: {
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
}));

const MoreInformationBlock = (): JSX.Element => {
  const classes = useStyles();
  const [text] = useProperty(schema.text);
  const [title] = useProperty(schema.name);
  const [buttonText] = useProperty(sales.buttonText);
  const [buttonTextTwo] = useProperty(sales.buttonTextTwo);

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
      <Typography className={classes.buttonText} variant="h2">{title.value}</Typography>
      <Button
        className={classes.button}
        endIcon={(
          <ArrowRightAltIcon
            className={classes.icon}
            style={{ fontSize: 40 }}
          />
        )}
      >
        {buttonText.value}
      </Button>
      <Typography
        className={classes.subtitle}
        variant="body1"
      >
        {text.value}
      </Typography>
      <Button
        className={classes.button}
        endIcon={(
          <ArrowRightAltIcon
            className={classes.icon}
            style={{ fontSize: 40 }}
          />
        )}
      >
        {buttonTextTwo.value}
      </Button>
      <Typography
        className={classes.subtitle}
        variant="body1"
      >
        {text.value}
      </Typography>
    </Grid>
  );
};

MoreInformationBlock.type = sales.MoreInformationBlock;

MoreInformationBlock.topology = containerTopology;

export default MoreInformationBlock;
