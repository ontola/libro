import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../helpers/iris';
import sales from '../../../ontology/sales';
import { gridTopology } from '../../../topologies/Grid';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

export interface CasePageShowcaseProps {
  noBackdrop?: boolean;
}

const useStyles = makeStyles<SalesTheme, CasePageShowcaseProps>((theme) => ({
  arrow: {
    color: '#2D7080',
    fontSize: 40,
  },
  margin: {
    marginTop: 100,
  },
  productButton: {
    alignItems: 'flex-start',
    background: (props) => props.noBackdrop ? 'none' : 'linear-gradient(to bottom, #f8fbff, #ffffff)',
    justifyContent: 'center',
    padding: 20,
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

const CasePageShowcase: FC<CasePageShowcaseProps> = (props) => {
  const classes = useStyles(props);
  const [name] = useProperty(schema.name);
  const [tagline] = useProperty(sales.tagline);
  const [text] = useProperty(schema.text);

  return (
    <Button
      className={classes.productButton}
      component={NavLink as React.ElementType}
      to={retrievePath(props.subject as NamedNode)!}
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

CasePageShowcase.type = sales.CasePage;

CasePageShowcase.topology = [
  showcaseTopology,
  gridTopology,
];

export default CasePageShowcase;
