import { NamedNode, Quad } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

const load = (lrs: LinkReduxLRSType, subject: NamedNode | null) => async () => {
  let statements: Quad[] = [];
  if (subject) {
    try {
      statements = lrs.tryEntity(subject);
      if (!statements.length && lrs.shouldLoadResource(subject)) {
        await lrs.getEntity(subject);
        statements = lrs.tryEntity(subject);
      }
    } catch {
      // Do nothing
    }
  }
  return statements;
};

export default load;
