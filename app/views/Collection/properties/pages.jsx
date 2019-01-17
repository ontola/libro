import {
  LinkedResourceContainer,
  linkType,
  register,
  withLRS,
  labelType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

class Pages extends React.PureComponent {
  static type = CollectionTypes;

  static property = NS.as('pages');

  static topology = allTopologies;

  static hocs = [withLRS];

  render() {
    const prop = this.props.lrs.getResourcePropertyRaw(
      this.props.subject,
      this.props.label
    );

    if (prop.length === 1) {
      return (
        <LinkedResourceContainer
          forceRender
          collectionDisplay={this.props.collectionDisplay}
          depth={this.props.depth}
          subject={prop[0].object}
        />
      );
    }

    const obs = prop.map(iri => (
      <LinkedResourceContainer
        collectionDisplay={this.props.collectionDisplay}
        depth={this.props.depth}
        key={`pages-${iri.object.value}`}
        subject={iri.object}
      />
    ));

    if (obs) {
      return (
        <React.Fragment>
          {obs}
        </React.Fragment>
      );
    }

    return null;
  }
}

Pages.propTypes = {
  collectionDisplay: linkType,
  depth: PropTypes.number,
  label: labelType,
  lrs: lrsType,
  subject: subjectType,
};

export default [register(Pages)];
