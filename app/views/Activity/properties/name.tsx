import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
import rdf, { SomeTerm } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { term } from '@rdfdev/iri';
import {
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React, {  ReactElement } from 'react';

import Detail from '../../../components/Detail';
import { LinkFeature } from '../../../components/Link';
import SuspendedLoader from '../../../components/Loading/SuspendedLoader';
import { allTopologies, detailsBarTopology } from '../../../topologies';

const uriMatch = /{{[\w:/#.?=]+}}/g;
const HANDLEBAR_LENGTH = 2;

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    marginBottom: '1em',
    marginTop: '1em',
  },
}));

const ActivityName = () => {
  const [actor] = useProperty(as.actor) ;
  const [name] = useProperty(schema.name) ;
  const [object] = useProperty(as.object) ;
  const [target] = useProperty(as.target) ;
  const iriMap: Record<string, SomeTerm> = {
    actor,
    name,
    object,
    target,
  };
  const classes = useStyles();
  const template = iriMap.name.value;
  const matches = template.match(uriMatch);
  const split = template.split(uriMatch);

  if (!matches) {
    return null;
  }

  const elems = split.reduce<ReactElement[]>((previousValue, currentValue, index) => {
    const iri = matches[index]?.slice(HANDLEBAR_LENGTH, -HANDLEBAR_LENGTH);
    const iriTerm = iri && term(rdf.namedNode(iri));
    const prop = iriMap[iriTerm];
    const features = iriTerm === term(as.actor) ? [] : [LinkFeature.Bold];

    return previousValue.concat(
      <React.Fragment key={`${iri}-${currentValue}`}>
        {currentValue && (
          <Detail
            smallMargin
            text={currentValue}
          />
        )}
        {iriTerm && (
          <Resource
            smallMargin
            features={features}
            key={prop.value}
            subject={prop}
            topology={detailsBarTopology}
            onLoad={SuspendedLoader}
          />
        )}
      </React.Fragment>,
    );
  }, []);

  return (
    <div className={classes.wrapper}>
      {elems}
    </div>
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

export default register(ActivityName);
