import {LinkedRenderStore, transformers} from 'link-lib';

const PRIO_MAX = 1.0;

export default (lrs: LinkedRenderStore<any>) => [
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'text/n3',
    storeTransformer: false,
    transformer: transformers.processRDF,
  },
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'text/turtle',
    storeTransformer: false,
    transformer: transformers.processRDF,
  },
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-quads',
    storeTransformer: true,
    transformer: transformers.linkedDeltaProcessor(lrs),
  },
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-triples',
    storeTransformer: false,
    transformer: transformers.processRDF,
  },
];
