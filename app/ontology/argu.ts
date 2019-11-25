import { createNS } from '@ontologies/core';

const argu = createNS('https://argu.co/ns/core#');

export default {
  ns: argu,

  /* classes */
  Argument: argu('Argument'),
  ConArgument: argu('ConArgument'),
  ContainerNode: argu('ContainerNode'),
  ProArgument: argu('ProArgument'),

  /* properties */
  lastActivityAt: argu('lastActivityAt'),
};
