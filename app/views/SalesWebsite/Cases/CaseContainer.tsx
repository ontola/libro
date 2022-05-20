import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
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
import { BreakPoints, LibroTheme } from '../../../themes/themes';
import { containerTopology, fullResourceTopology } from '../../../topologies';
import Container from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';

export interface CaseContainerProps {
  noBackdrop?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
  },
  image: {
    [theme.breakpoints.down(BreakPoints.Large)]: {
      backgroundSize: 'fill',
      maxWidth: '100%',
    },
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      backgroundSize: 'percentage',
      maxWidth: '100%',
    },
  },
  imageContainer: {
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, .1))',
    marginBottom: 85,
  },
  propositionSelector: {
    display: 'grid',
    gridGap: '5em',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
        <Property
          className={classes.image}
          label={schema.image}
        />
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
        justifyContent="center"
      >
        <Typography variant="h2">
          {name.value}
        </Typography>
        <Typography className={classes.subTitle}>
          {text.value}
        </Typography>
        {renderedImage}
        <Showcase>
          <div className={classes.propositionSelector}>
            <Grid
              container
              spacing={4}
            >
              <Property
                childProps={{ noBackdrop }}
                label={sales.caseShowcase}
              />
            </Grid>
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
