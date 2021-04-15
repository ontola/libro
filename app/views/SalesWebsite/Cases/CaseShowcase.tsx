import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  arrow: {
    color: '#2D7080',
    fontSize: 40,
  },
  margin: {
    marginTop: 100,
  },
  productButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    padding: '0 30px',
    textAlign: 'left',
    textTransform: 'none',
  },
  themeIndicator: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
  },
}));

const CaseShowcase: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [tagline] = useProperty(sales.tagline);
  const [text] = useProperty(schema.text);

  return (
    <Button
      className={classes.productButton}
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
      >
        <Typography
          className={classes.themeIndicator}
          variant="h6"
        >
          {name.value}
        </Typography>
        <Typography
          className={classes.title}
          variant="h6"
        >
          {tagline.value}
        </Typography>
        <Typography variant="h6">
          {text.value}
        </Typography>
        <ArrowRightAltIcon className={classes.arrow} />
      </Grid>
    </Button>
  );
};

CaseShowcase.type = sales.CasePage;

CaseShowcase.topology = showcaseTopology;

export default CaseShowcase;
