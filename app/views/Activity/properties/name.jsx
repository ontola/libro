import LinkedRenderStore, { namedNodeByIRI } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import { DetailText } from '../../../components';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

class ActivityName extends PropertyBase {
  render() {
    const { name } = this.props;

    const template = name.value;
    const matches = template.match(uriMatch);
    const split = template.split(uriMatch);
    const elems = split.reduce((previousValue, currentValue) => {
      if (currentValue === '') {
        const iri = matches.shift().slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
        const { term } = namedNodeByIRI(iri);
        return previousValue.concat(<LinkedResourceContainer subject={this.props[term]} theme="parent" />);
      }

      return previousValue.concat(<DetailText>{currentValue}</DetailText>);
    }, []);

    return (
      <React.Fragment>
        {elems}
      </React.Fragment>
    );
  }
}

const NamePredicates = [
  NS.schema('name'),
  NS.as('name'),
  NS.rdfs('label'),
  NS.foaf('name'),
];

export default LinkedRenderStore.registerRenderer(
  link([
    NS.as('actor'),
    NS.schema('name'),
    NS.as('target'),
  ])(ActivityName),
  NS.schema('Thing'),
  NamePredicates,
  allTopologies
);
