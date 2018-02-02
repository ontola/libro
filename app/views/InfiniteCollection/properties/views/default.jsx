import {
  contextTypes,
  linkedPropType,
  LinkedResourceContainer,
  Property,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../../helpers/LinkedRenderStore';
import { CardButton } from '../../../../components';
import CollapsibleContainer from '../../../../containers/CollapsibleContainer';

class Views extends PropertyBase {
  render() {
    const pageIRIs = this.getLinkedObjectPropertyRaw().map(statement => statement.object);

    return (
      <div>
        <Property label={[NS.schema('name'), NS.rdfs('label')]} />
        {pageIRIs.map(iri => <LinkedResourceContainer key={`view-${iri}`} subject={iri} />)}
        <LinkedResourceContainer subject={pageIRIs[pageIRIs.length - 1]}>
          <CollapsibleContainer
            alwaysMountChildren={false}
            id={pageIRIs[pageIRIs.length - 1].value}
            trigger={<CardButton plain>Load more</CardButton>}
          >
            <Property label={NS.argu('next')} />
          </CollapsibleContainer>
        </LinkedResourceContainer>
      </div>
    );
  }
}

Views.contextTypes = contextTypes;
Views.propTypes = {
  linkedProp: linkedPropType,
};
