import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { fullResourceTopology } from '../../../topologies';
import Container from '../../../topologies/Container';

const LOWER_SECTION_BOTTOM_MARGIN = 40;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  academyContainer: {
    margin: 20,
    paddingBottom: '4em',
  },
  button: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightMedium,
  },
  buttonPrimary: {
    backgroundColor: '#B33A00',
    borderRadius: 3,
    color: 'white',
    height: 48,
    margin: 20,
    padding: 20,
  },
  container: {
    alignItems: 'stretch',
  },
  gridStyle: {
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  image: {
    padding: 20,
    width: 'clamp(100px, 30vw, 300px)',
  },
  imageWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  lowerSection: {
    marginBottom: theme.spacing(LOWER_SECTION_BOTTOM_MARGIN),
    marginTop: theme.spacing(LOWER_SECTION_BOTTOM_MARGIN),
  },
  paperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPageTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    color: 'black',
    height: 170,
    margin: 10,
    padding: '0 30px',
    width: 250,
  },
  subtitle: {
    textAlign: 'center',
    width: 643,
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
    marginTop: '-1rem',
  },
}));

const ProcessPageFull: FC = () => {
  const classes = useStyles();
  const [textTitle] = useProperty(sales.textTitle);
  const [textBlock] = useProperty(sales.textBlock);

  return (
    <main
      className={classes.wrapper}
      role="main"
    >
      <Property label={sales.header} />
      <Container>
        <Grid
          item
          md={8}
          sm={12}
        >
          <Typography
            className={classes.title}
            variant="h2"
          >
            {textTitle.value}
          </Typography>
          <Typography
            variant="body1"
          >
            {textBlock.value}
          </Typography>
        </Grid>
      </Container>
      <Container>
        <Grid
          container
          alignItems="center"
          className={classes.container}
          direction="row"
          justify="center"
        >
          <Grid
            item
            md={8}
            sm={12}
          >
            <Property label={sales.stepper} />
          </Grid>
          <Grid
            item
            className={classes.imageWrapper}
            md={4}
            sm={12}
          >
            <Property
              className={classes.image}
              label={schema.image}
            />
            <Property
              className={classes.image}
              label={sales.secondaryImage}
            />
            <Property
              className={classes.image}
              label={sales.tertiaryImage}
            />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <div className={classes.lowerSection}>
          <Property label={argu.lowerSection} />
        </div>
      </Container>
      <Property
        label={sales.callToActionBlock}
        trackingId="process-page-full-cta"
      />
    </main>
  );
};

ProcessPageFull.type = sales.ProcessPage;

ProcessPageFull.topology = fullResourceTopology;

export default ProcessPageFull;
