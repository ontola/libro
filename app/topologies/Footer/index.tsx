import { Grid } from '@material-ui/core';
import { Node } from '@ontologies/core';
import { linkType, Resource } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../ontology/ontola';
import Topology from '../Topology';

import './index.scss';

export const footerTopology = ontola.ns('footer');

interface Props {
  resources?: Node[];
}

class Footer extends Topology<Props> {
  public static propTypes = {
    resources: PropTypes.arrayOf(linkType),
  };

  constructor(props: Props) {
    super(props);

    this.className = 'Footer navbar-background navbar-color';
    this.topology = footerTopology;
  }

  public renderContent() {
    if (!this.props.resources || this.props.resources?.length === 0) {
      return this.wrap(null);
    }

    return this.wrap((
      <div className={this.getClassName()}>
        <div className="Footer__container">
          <Grid container spacing={6}>
            {this.props.resources?.map((iri) => (
              <Grid item key={iri.value} lg={this.lgSize()} md={this.mdSize()} xs={12}>
                <Resource subject={iri} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
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

export default Footer;
