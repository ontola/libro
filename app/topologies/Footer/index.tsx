import { Box, Grid } from '@mui/material';
import { WithStyles, withStyles } from '@mui/styles';
import { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import { gridHeaderCID } from '../../components/Grid/GridHeader';
import { headingCID } from '../../components/Heading';
import HeadingContext from '../../components/Heading/HeadingContext';
import { IndexablePalette, LibroTheme } from '../../themes/themes';
import { footerTopology } from '../../topologies';
import Topology from '../Topology';

enum GridWidth {
  third = 4,
  half = 6,
  full = 12,
}

const TWO_ITEMS = 2;

const styles = (theme: LibroTheme) => {
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
};

interface FooterProps extends React.PropsWithChildren<WithStyles<typeof styles>> {
  legacy?: boolean;
  resources?: Node[];
}

class Footer extends Topology<FooterProps> {
  constructor(props: FooterProps) {
    super(props);

    this.className = this.getClassName();
    this.topology = footerTopology;
  }

  public getClassName(): string {
    return this.props.classes.footer;
  }

  public renderContent() {
    if (!this.props.legacy) {
      return this.wrap(this.props.children);
    }

    if (!this.props.resources || this.props.resources.length === 0) {
      return this.wrap(null);
    }

    return this.wrap((
      <HeadingContext>
        <Box
          className={this.getClassName()}
        >
          <div className={this.props.classes.footerContainer}>
            <Grid
              container
              spacing={6}
            >
              {this.props.resources.map((iri) => (
                <Grid
                  item
                  key={iri.value}
                  lg={Footer.lgSize(this.props.resources!.length)}
                  md={Footer.mdSize(this.props.resources!.length)}
                  xs={GridWidth.full}
                >
                  <Resource subject={iri} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      </HeadingContext>
    ));
  }

  static mdSize(itemCount: number): GridWidth {
    if (itemCount === 1) {
      return GridWidth.full;
    }

    return GridWidth.half;
  }

  static lgSize(itemCount: number): GridWidth {
    if (itemCount === 1) {
      return GridWidth.full;
    }

    if (itemCount === TWO_ITEMS) {
      return GridWidth.half;
    }

    return GridWidth.third;
  }
}

export default withStyles(styles)(Footer);
