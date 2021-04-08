import * as as from '@ontologies/as';
import rdf, { Literal, SomeTerm } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { term } from '@rdfdev/iri';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React, { ReactElement } from 'react';

import Detail from '../../../components/Detail';
import { LinkFeature } from '../../../components/Link';
import SuspendedLoader from '../../../components/Loading/SuspendedLoader';
import { allTopologies } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

interface ActivityNameProps {
  linkedProp: SomeTerm;
  name: Literal;

  [prop: string]: SomeTerm;
}

const ActivityName: FC<ActivityNameProps> = (props) => {
  const template = props.name.value;
  const matches = template.match(uriMatch);
  const split = template.split(uriMatch);

  if (!matches) {
    return null;
  }

  const elems = split.reduce<ReactElement[]>((previousValue, currentValue, index) => {
    const iri = matches[index]?.slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
    const iriTerm = iri && term(rdf.namedNode(iri));
    const prop = props[iriTerm];
    const features = iriTerm === term(as.actor) ? [] : [LinkFeature.Bold];

    return previousValue.concat(
      <React.Fragment key={`${iri}-${currentValue}`}>
        {currentValue && <Detail smallMargin text={currentValue} />}
        {iriTerm && (
          <Resource
            smallMargin
            features={features}
            key={prop.value}
            subject={prop}
            onLoad={SuspendedLoader}
          />
        )}
      </React.Fragment>,
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

export default register(ActivityName);
