import as from '@ontologies/as';
import rdf from '@ontologies/core';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { term } from '@rdfdev/iri';
import {
  LinkedResourceContainer,
  PropertyBase,
  register,
} from 'link-redux';
import React from 'react';

import { DetailText, SuspendedLoader } from '../../../components';
import { allTopologies } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

class ActivityName extends PropertyBase {
  static type = as.Activity;

  static property = [
    schema.name,
    as.name,
    rdfs.label,
    foaf.name,
  ];

  static topology = allTopologies;

  static mapDataToProps = {
    actor: as.actor,
    name: schema.name,
    object: as.object,
    target: as.target,
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
              theme={iriTerm === term(as.actor) ? 'default' : 'parent'}
              onLoad={SuspendedLoader}
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
