import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
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
import { ReadMoreButton } from '../../../components/SalesWebsite';

export interface CasePageShowcaseProps {
  noBackdrop?: boolean;
}

const CONTAINER_SPACING = 2;

const useButtonOverrideStyles = makeStyles({
  label: {
    height: '100%',
  },
});

const useStyles = makeStyles<SalesTheme, CasePageShowcaseProps>((theme) => ({
  container: {
    gap: theme.spacing(CONTAINER_SPACING),
    height: '100%',
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
  },
  readMore: {
    fontSize: '1rem',
    marginTop: 'auto',
  },
  themeIndicator: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
  title: {
    fontSize: 22,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const CasePageShowcase: FC<CasePageShowcaseProps> = (props) => {
  const classes = useStyles(props);
  const buttonOverrideStyles = useButtonOverrideStyles();
  const [name] = useProperty(schema.name);
  const [tagline] = useProperty(sales.tagline);
  const [text] = useProperty(schema.text);

  return (
    <Button
      className={classes.productButton}
      classes={buttonOverrideStyles}
      component={NavLink as React.ElementType}
      to={retrievePath(props.subject as NamedNode)!}
    >
      <Grid
        container
        className={classes.container}
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
        <Typography variant="body1">
          {text.value}
        </Typography>
        <ReadMoreButton className={classes.readMore} />
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
