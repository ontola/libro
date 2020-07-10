import {LinkReduxLRSType, RenderStoreProvider, useLRS} from 'link-redux';
import React from 'react';

import generateLRS from '../helpers/generateLRS';
import { ontolaActionPrefix } from '../middleware/ontolaMiddleware';
// @ts-ignore
import register from '../views';

const cloneLRS = (old: LinkReduxLRSType) =>  {
  const { lrs: next } = generateLRS();

  register(next);

  next.store.addQuads((old.store as any).store.quads);
  next.store.changeTimestamps = (old.store as any).changeTimestamps.slice();
  (next.api as any).invalidationMap = new Map((old.api as any).invalidationMap);
  next.schema.addQuads((old.schema as any).store.quads);

  const nextDispatch = next.dispatch;

  next.dispatch = (iri, ...args) => {
    if (iri.value.startsWith(ontolaActionPrefix)) {
      return old.dispatch(iri, ...args);
    }

    return nextDispatch(iri, ...args);
  };

  return next;
};

export const withFormLRS = (WrappedComponent: any) => {
  const WithFormLRS = (props: {}) => {
    const lrs = useLRS();
    const formLRS = React.useMemo(() => cloneLRS(lrs), []);

    return (
      <RenderStoreProvider value={(formLRS as LinkReduxLRSType)}>
        <WrappedComponent {...props} />
      </RenderStoreProvider>
    );
  };

  return WithFormLRS;
};
