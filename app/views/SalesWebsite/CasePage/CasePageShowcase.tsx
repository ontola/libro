import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReadMoreButton } from '../../../components/SalesWebsite';
import retrievePath from '../../../helpers/iris';
import sales from '../../../ontology/sales';
import { BreakPoints, LibroTheme } from '../../../themes/themes';
import { gridTopology, showcaseTopology } from '../../../topologies';

export interface CasePageShowcaseProps {
  noBackdrop?: boolean;
  headingLevel?: React.ElementType;
}

const CONTAINER_SPACING = 2;

const useButtonOverrideStyles = makeStyles({
  label: {
    height: '100%',
  },
});

const useStyles = makeStyles<LibroTheme, CasePageShowcaseProps>((theme) => ({
  container: {
    gap: theme.spacing(CONTAINER_SPACING),
    height: '100%',
  },
  margin: {
    marginTop: 100,
  },
  productButton: {
    '&:hover $readMore': {
      textDecoration: 'underline',
    },
    alignItems: 'flex-start',
    background: (props) => props.noBackdrop ? 'none' : 'linear-gradient(to bottom, #f8fbff, #ffffff)',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'left',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      background: '#f8fbff !important',
    },
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
  const [theme] = useProperty(sales.theme);
  const [tagline] = useProperty(sales.tagline);

  return (
    <Grid
      item
      md={4}
      sm={12}
    >
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
          justifyContent="flex-start"
        >
          <Typography
            className={classes.themeIndicator}
            component="span"
            variant="h6"
          >
            {theme.value}
          </Typography>
          <Typography
            className={classes.title}
            component={props.headingLevel ?? 'h3'}
            variant="h3"
          >
            {name.value}
          </Typography>
          <Typography variant="body1">
            {tagline.value}
          </Typography>
          <ReadMoreButton className={classes.readMore} />
        </Grid>
      </Button>
    </Grid>
  );
};

CasePageShowcase.type = sales.CasePage;

CasePageShowcase.topology = [
  showcaseTopology,
  gridTopology,
];

export default CasePageShowcase;
