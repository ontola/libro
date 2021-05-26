import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Container, { containerTopology } from '../../../topologies/Container';

export interface CaseContainerProps {
  noBackdrop?: boolean;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
  },
  image: {
    [theme.breakpoints.down('md')]: {
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
    <Container>
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
          endIcon={<ChevronRightIcon />}
          to={retrievePath(caseButtonLink.value)}
        >
          {caseButtonText.value}
        </Button>
      </Grid>
    </Container>
  );
};

CaseContainer.type = sales.Cases;

CaseContainer.topology = [fullResourceTopology, containerTopology];

export default CaseContainer;
