import { Box, Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import { gridHeaderCID } from '../../components/Grid/GridHeader';
import { headingCID } from '../../components/Heading';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

export const footerTopology = ontola.ns('footer');

type FooterProps = WithStyles<typeof styles> & {
  legacy?: boolean;
  resources?: Node[];
};

const styles = (theme: LibroTheme) => ({
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
    backgroundColor: theme.appBar.background,
    color: theme.appBar.resolveColor(),
    marginTop: '1rem',
    padding: '1rem',
  },
  footerContainer: {
    margin: 'auto',
    maxWidth: theme.containerWidth.large,
  },
});

class Footer extends Topology<FooterProps> {
  constructor(props: FooterProps) {
    super(props);

    this.className = this.props.classes.footer;
    this.topology = footerTopology;
  }

  public renderContent() {
    if (!this.props.legacy) {
      return this.wrap(this.props.children);
    }

    if (!this.props.resources || this.props.resources?.length === 0) {
      return this.wrap(null);
    }

    return this.wrap((
      <Box
        className={this.getClassName()}
      >
        <div className={this.props.classes.footerContainer}>
          <Grid
            container
            spacing={6}
          >
            {this.props.resources?.map((iri) => (
              <Grid
                item
                key={iri.value}
                lg={this.lgSize()}
                md={this.mdSize()}
                xs={12}
              >
                <Resource subject={iri} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    ));
  }
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  private mdSize(): 6|12 {
    if (this.props.resources?.length === 1) {
      return 12;
    }

    return 6;
  }

  private lgSize(): 4|6|12 {
    if (this.props.resources?.length === 1) {
      return 12;
    }

    if (this.props.resources?.length === 2) {
      return 6;
    }

    return 4;
  }
}

export default withStyles(styles)(Footer);
