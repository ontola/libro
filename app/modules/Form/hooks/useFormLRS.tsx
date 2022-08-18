import {
  LinkReduxLRSType,
  RenderStoreProvider,
  useLRS,
} from 'link-redux';
import React from 'react';

import generateLRS from '../../../helpers/generateLRS';
import register from '../../../register';
// @ts-ignore
import { libroActionPrefix } from '../../Common/middleware/common';
import { WebManifest } from '../../Kernel/components/AppContext/WebManifest';
import { appContext } from '../../Kernel/components/AppContext/appContext';
import LinkLoader from '../../Kernel/components/LinkLoader';
import { modulesKey } from '../../Kernel/lib/settings';

export interface ClonedLRS extends LinkReduxLRSType {
  originalLRS: LinkReduxLRSType
}

const cloneLRS = async (old: LinkReduxLRSType, manifest: WebManifest) => {
  const { lrs: next } = await generateLRS(
    manifest,
    old.settings.get(modulesKey),
    undefined,
    window.EMP_SYMBOL_MAP,
    { middleware: false },
  );

  register(next, old.settings.get(modulesKey));

  if (old) {
    next.store.addQuads((old.store as any).store.quads);
    (next.store as any).langPrefs = (old.store as any).langPrefs;
    (next.api as any).invalidationMap = new Map((old.api as any).invalidationMap);
    next.store.getInternalStore().store.journal = next.store.getInternalStore().store.journal.copy((next.store as any).handleChange.bind(next.store));
    next.actions = old.actions;

    const nextDispatch = next.dispatch;

    (next as ClonedLRS).originalLRS = old;

    next.dispatch = (iri, ...args) => {
      if (iri.value.startsWith(libroActionPrefix)) {
        return old.dispatch(iri, ...args);
      }

      return nextDispatch(iri, ...args);
    };
  }

  return next;
};

export function withFormLRS<P>(WrappedComponent: React.FC<P>): React.FC<P> {
  const WithFormLRS: React.FC<P> = (props: P) => {
    const lrs = useLRS();
    const { manifest } = React.useContext(appContext);

    const [formLRS, setFormLRS] = React.useState<LinkReduxLRSType | undefined>();

    React.useEffect(() => {
      cloneLRS(lrs, manifest).then((cloned) => setFormLRS(cloned));
    }, [lrs, manifest]);

    if (!formLRS) {
      return <LinkLoader />;
    }

    return (
      <RenderStoreProvider value={formLRS}>
        <WrappedComponent {...props} />
      </RenderStoreProvider>
    );
  };

  return WithFormLRS;
}
