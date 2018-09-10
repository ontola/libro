import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  labelType,
  PropertyBase,
  subjectType,
} from 'link-redux';
import React from 'react';

import { Columns } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

class Views extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectPropertyRaw(this.props.label);

    if (prop.length === 1) {
      return <LinkedResourceContainer forceRender subject={prop[0].object} />;
    }
    const obs = prop.map(iri => <LinkedResourceContainer key={`views-${iri.object.value}`} subject={iri.object} />);
    if (obs && obs.length > 1) {
      return <Columns>{obs}</Columns>;
    } else if (obs) {
      return obs;
    }

    return null;
  }
}

Views.propTypes = {
  label: labelType.isRequired,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    Views,
    CollectionViewTypes,
    NS.as('pages'),
    allTopologies
  ),
];
