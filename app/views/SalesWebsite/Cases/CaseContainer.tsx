import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../helpers/iris';
import sales from '../../../ontology/sales';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

export interface CaseContainerProps {
  noBackdrop?: boolean;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
  '@keyframes myEffect': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '50%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
    textTransform: 'none',
  },
  iconStyle: {
    color: '#2D7080',
    fontSize: 60,
  },
  image: {
    [theme.breakpoints.down('md')]: {
      animation: `$myEffect 10s ${theme.transitions.easing.easeInOut} infinite`,
      backgroundSize: 'fill',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('md')]: {
      backgroundSize: 'percentage',
      maxWidth: '100%',
    },
  },
  imageContainer: {
    marginBottom: 85,
  },
  propositionSelector: {
    display: 'grid',
    gridGap: '5em',
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  subTitle: {
    marginBottom: '3rem',
    maxWidth: 519,
    textAlign: 'center',
  },
}));

const CaseContainer: FC<CaseContainerProps> = ({ noBackdrop }) => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [caseButtonLink] = useProperty(sales.caseButtonLink);
  const [caseButtonText] = useProperty(sales.caseButtonText);
  let renderedImage;

  if (image !== undefined) {
    renderedImage = (
      <div className={classes.imageContainer}>
        <Property className={classes.image} label={schema.image} />
      </div>
    );
  } else {
    renderedImage = (
      <div />
    );
  }

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
    >
      <Typography variant="h2">{name.value}</Typography>
      <Typography className={classes.subTitle}>{text.value}</Typography>
      {renderedImage}
      <Showcase>
        <div className={classes.propositionSelector}>
          <Property childProps={{ noBackdrop }} label={sales.caseShowcase} />
        </div>
      </Showcase>
      <Button
        className={classes.button}
        component={NavLink as React.ElementType}
        endIcon={<ArrowRightAltIcon color="primary" style={{ fontSize: 35 }} />}
        to={retrievePath(caseButtonLink.value)}
      >
        {caseButtonText.value}
      </Button>
    </Grid>
  );
};

CaseContainer.type = sales.Cases;

CaseContainer.topology = containerTopology;

export default CaseContainer;
