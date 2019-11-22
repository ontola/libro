import { term } from '@ontola/mash';
import rdf from '@ontologies/core';
import {
  LinkedResourceContainer,
  PropertyBase,
  register,
} from 'link-redux';
import React from 'react';

import { DetailText } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

class ActivityName extends PropertyBase {
  static type = NS.as('Activity');

  static property = [
    NS.schema('name'),
    NS.as('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ];

  static topology = allTopologies;

  static mapDataToProps = {
    actor: NS.as('actor'),
    name: NS.schema('name'),
    object: NS.as('object'),
    target: NS.as('target'),
  };

  render() {
    const { name } = this.props;

    const template = name.value;
    const matches = template.match(uriMatch);
    const split = template.split(uriMatch);

    const elems = split.reduce((previousValue, currentValue, index) => {
      const iri = matches[index]?.slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
      const iriTerm = iri && term(rdf.namedNode(iri));

      return previousValue.concat(
        <React.Fragment key={`${iri}-${currentValue}`}>
          <DetailText>{currentValue}</DetailText>
          {term && (
            <LinkedResourceContainer
              key={this.props[iriTerm]}
              subject={this.props[iriTerm]}
              theme={iriTerm === term(NS.as('actor')) ? 'default' : 'parent'}
            />
          )}
        </React.Fragment>
      );
    }, []);

    return (
      <React.Fragment>
        {elems}
      </React.Fragment>
    );
  }
}

export default register(ActivityName);
