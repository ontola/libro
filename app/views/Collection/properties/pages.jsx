import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  labelType,
  PropertyBase,
  subjectType,
} from 'link-redux';
import React from 'react';

import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';
import { CollectionTypes } from '../types';

class Pages extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectPropertyRaw(this.props.label);

    if (prop.length === 1) {
      return <LinkedResourceContainer forceRender subject={prop[0].object} />;
    }
    const obs = prop.map(iri => <LinkedResourceContainer key={`pages-${iri.object.value}`} subject={iri.object} />);
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
  label: labelType.isRequired,
  subject: subjectType
};

export default [
  LinkedRenderStore.registerRenderer(
    Pages,
    CollectionTypes,
    NS.as('pages'),
    allTopologies
  ),
];
