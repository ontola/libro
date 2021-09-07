import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import React from 'react';

import { appContextEditor } from '../../../appContext';
import generateLRS from '../../../helpers/generateLRS';
import register from '../../../views';
import { EditorEvents, EditorUpdateEvent } from '../EditorUpdateEvent';
import { PageViewerState } from '../PageViewerState';
import parseToGraph from '../parseToGraph';

export const Communicator = (): null => {
  const updateCtx = React.useContext(appContextEditor);

  const [message, setMessage] = React.useState<PageViewerState | undefined>(undefined);

  React.useEffect(() => {
    const listener = (e: MessageEvent<EditorUpdateEvent>) => {
      switch(e.data.type) {
      case EditorEvents.EditorUpdate:
        return setMessage(e.data.viewOpts);
      case EditorEvents.EditorClose:
        return window.close();
      }
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [updateCtx]);

  React.useEffect(() => {
    if (!message) {
      return;
    }

    const { currentResource, doc: { source } } = message;

    try {
      const graphs = parseToGraph(source);
      const data = graphs.flatMap(([_, rdfIndex]) => (rdfIndex as RDFIndex).quads);
      const next = generateLRS(data);
      register(next.lrs);

      updateCtx((prev) => ({
        ...prev,
        lrs: next.lrs,
        resource: currentResource,
        theme: message.manifest.ontola?.theme ?? 'common',
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.debug(err);
    }
  }, [message, updateCtx]);

  return null;
};
