import { NamedNode, Quad } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

const load = (lrs: LinkReduxLRSType, subject: NamedNode | null) => async () => {
  // console.log('Predicaten in store', lrs.store.match(null, rdfx.type, rdfx.Property, null));
  let statements: Quad[] = [];
  if (subject) {
    try {
      statements = lrs.tryEntity(subject);
      if (!statements.length && lrs.shouldLoadResource(subject)) {
        await lrs.getEntity(subject);
        statements = lrs.tryEntity(subject);
      }
    } catch {}
  }
  return statements;
};

export default load;

