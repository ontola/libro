/* eslint-disable no-magic-numbers */
import { Box, Grid } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import { Resource, linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { ComponentType } from 'react';

import ontola from '../../ontology/ontola';
import Topology from '../Topology';

import './index.scss';

export const footerTopology = ontola.ns('footer');

interface Props {
  resources?: Node[];
  theme: {
    appBar: {
      background: string,
      resolveColor: () => string,
    },
  };
}

class Footer extends Topology<Props> {
  public static propTypes = {
    resources: PropTypes.arrayOf(linkType),
  };

  constructor(props: Props) {
    super(props);

    this.className = 'Footer';
    this.topology = footerTopology;
  }

  public renderContent() {
    if (!this.props.resources || this.props.resources?.length === 0) {
      return this.wrap(null);
    }

    const {
      background,
      resolveColor,
    } = this.props.theme.appBar;
    const color = resolveColor();

    return this.wrap((
      <Box bgcolor={`${background}.main`} className={this.getClassName()} color={color}>
        <div className="Footer__container">
          <Grid container spacing={6}>
            {this.props.resources?.map((iri) => (
              <Grid item key={iri.value} lg={this.lgSize()} md={this.mdSize()} xs={12}>
                <Resource subject={iri} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    ));
  }

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

export default withTheme(Footer as unknown as ComponentType);
