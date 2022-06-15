import {
  BlankNode,
  Literal,
  NamedNode,
} from '@ontologies/core';
import {
  LinkedDataObject,
  TermOpts,
  useResourceLink,
} from 'link-redux';

import app from '../../../ontology/app';
import argu from '../../Argu/ontology/argu';
import ontola from '../../../ontology/ontola';

export const useCurrentActor = (): LinkedDataObject<{
    actorType: Literal;
    primaryEmail: NamedNode;
}, TermOpts | undefined, NamedNode | BlankNode | Literal | undefined> => {
  // Might be changed later with a context value
  const actorIRI = app.c_a;

  return useResourceLink(actorIRI, {
    actorType: ontola.actorType,
    primaryEmail: argu.primaryEmail,
  });
};
