import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  labelType,
  PropertyBase,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

class Pages extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectPropertyRaw(this.props.label);

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
  depth: PropTypes.number,
  label: labelType.isRequired,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    Pages,
    CollectionTypes,
    NS.as('pages'),
    allTopologies
  ),
];
