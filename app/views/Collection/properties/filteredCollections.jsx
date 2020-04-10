import LinkedRenderStore from 'link-lib';
import {
  Resource,
  ReturnType,
  link,
  linkType,
} from 'link-redux';
import React from 'react';

import { sort } from '../../../helpers/data';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

const ORDER = [
  'filter%5B%5D=option%3Dyes',
  'filter%5B%5D=option%3Dpro',
  'filter%5B%5D=option%3Dother',
  'filter%5B%5D=option%3Dneutral',
  'filter%5B%5D=option%3Dno',
  'filter%5B%5D=option%3Dcon',
];

const propTypes = {
  filteredCollections: linkType,
};

class FilteredCollections extends React.PureComponent {
  render() {
    const {
      filteredCollections,
      ...rest
    } = this.props;

    return filteredCollections
      .sort(sort(ORDER))
      .map((iri) => (
        <Resource
          {...rest}
          key={iri.value}
          subject={iri}
        />
      ));
  }
}

FilteredCollections.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    link({
      filteredCollections: {
        label: ontola.filteredCollections,
        returnType: ReturnType.AllTerms,
      },
    })(FilteredCollections),
    CollectionTypes,
    ontola.filteredCollections,
    allTopologies
  ),
];
