import as from '@ontologies/as';
import rdf from '@ontologies/core';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { term } from '@rdfdev/iri';
import RDFTypes from '@rdfdev/prop-types';
import {
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import DetailText from '../../../components/Detail/text';
import { SuspendedLoader } from '../../../components/Loading';
import { allTopologies } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

const ActivityName = (props) => {
  const template = props.name.value;
  const matches = template.match(uriMatch);
  const split = template.split(uriMatch);

  const elems = split.reduce((previousValue, currentValue, index) => {
    const iri = matches[index]?.slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
    const iriTerm = iri && term(rdf.namedNode(iri));

    return previousValue.concat(
      <React.Fragment key={`${iri}-${currentValue}`}>
        <DetailText>{currentValue}</DetailText>
        {iriTerm && (
          <Resource
            key={props[iriTerm]}
            subject={props[iriTerm]}
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
};

ActivityName.type = as.Activity;

ActivityName.property = [
  schema.name,
  as.name,
  rdfs.label,
  foaf.name,
];

ActivityName.topology = allTopologies;

ActivityName.mapDataToProps = {
  actor: as.actor,
  name: schema.name,
  object: as.object,
  target: as.target,
};

ActivityName.propTypes = {
  name: RDFTypes.literal,
};

export default register(ActivityName);
