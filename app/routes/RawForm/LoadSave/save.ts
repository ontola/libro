import { NamedNode, Quad } from '@ontologies/core';
// import { RDFIndex } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

// @ts-ignore
const save = (lrs: LinkReduxLRSType, subject: NamedNode | null) => async (statements: Quad[]) => {
  // const graph = new RDFIndex();
  // statements.forEach((statement) => {
  //   const s = cloneQuad(statement);
  //   s.subject = ll.targetResource;
  //   graph.addQuad(s);
  // })
  // lrs.api.fetchAction('PUT', subject.value, '', [graph, []])
};

export default save;
