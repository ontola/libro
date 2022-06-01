import { Grid } from '@mui/material';
import { Node } from '@ontologies/core';
import { Resource, useTopologyProvider } from 'link-redux';
import React from 'react';
import { makeStyles } from '@mui/styles';

import { gridHeaderCID } from '../../modules/Common/components/Grid/GridHeader';
import { headingCID } from '../../modules/Common/components/Heading';
import HeadingContext from '../../modules/Common/components/Heading/HeadingContext';
import { IndexablePalette, LibroTheme } from '../../themes/themes';
import { footerTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

interface FooterProps {
  legacy?: boolean;
  resources?: Node[];
}

enum GridWidth {
  third = 4,
  half = 6,
  full = 12,
}

const TWO_ITEMS = 2;

const useStyles = makeStyles((theme: LibroTheme) => {
  const backgroundColor = theme.appBar.background
    ? (theme.palette as unknown as IndexablePalette)[theme.appBar.background]?.main ?? theme.palette.common.black
    : theme.palette.common.black;

  return ({
    footer: {
      [`& .${gridHeaderCID}`]: {
        [`& .${headingCID}`]: {
          marginBottom: '.6rem',
        },
      },
      '& .fa + div': {
        marginLeft: '.2rem',
      },
      '& img': {
        maxWidth: '100%',
      },
      backgroundColor,
      color: theme.appBar.resolveColor(),
      marginTop: '1rem',
      padding: '1rem',
      position: 'relative' as any,
    },
    footerContainer: {
      margin: 'auto',
      maxWidth: theme.containerWidth.large,
    },
  });
});

const mdSize = (itemCount: number): GridWidth => {
  if (itemCount === 1) {
    return GridWidth.full;
  }

  return GridWidth.half;
};

const lgSize = (itemCount: number): GridWidth => {
  if (itemCount === 1) {
    return GridWidth.full;
  }

  if (itemCount === TWO_ITEMS) {
    return GridWidth.half;
  }

  return GridWidth.third;
};

const Footer: TopologyFC<FooterProps> = ({ children, legacy, resources }) => {
  const [FooterTopology] = useTopologyProvider(footerTopology);
  const classes = useStyles();

  if (legacy) {
    return (
      <FooterTopology>
        {children}
      </FooterTopology>
    );
  }

  if (!resources?.length) {
    return null;
  }

  return (
    <FooterTopology>
      <HeadingContext>
        <div className={classes.footer}>
          <div className={classes.footerContainer}>
            <Grid
              container
              spacing={6}
            >
              {resources.map((iri) => (
                <Grid
                  item
                  key={iri.value}
                  lg={lgSize(resources.length)}
                  md={mdSize(resources.length)}
                  xs={GridWidth.full}
                >
                  <Resource subject={iri} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </HeadingContext>
    </FooterTopology>
  );
};

export default Footer;
