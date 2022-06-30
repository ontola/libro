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

import argu from '../../Argu/lib/argu';
import app from '../../Core/ontology/app';
import ontola from '../../Core/ontology/ontola';

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
