import React from 'react';

import { appContextEditor } from '../../../appContext';
import generateLRS from '../../../helpers/generateLRS';
import register from '../../../views';
import parseToGraph from '../lib/parseToGraph';
import { EditorEvents, EditorUpdateEvent } from '../lib/EditorUpdateEvent';
import { PageViewerState } from '../lib/PageViewerState';

const Communicator = (): null => {
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

    const updateContext = async ({ currentResource, doc: { source } }: PageViewerState) => {
      try {
        const graphs = parseToGraph(source);
        const data = graphs.flatMap(([_, rdfIndex]) => (
          rdfIndex
        ).quads);
        const next = await generateLRS(message.manifest, data);
        register(next.lrs);

        updateCtx((prev) => (
          {
            ...prev,
            lrs: next.lrs,
            resource: currentResource,
            theme: message.manifest.ontola?.theme ?? 'common',
          }
        ));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.debug(err);
      }
    };

    updateContext(message);
  }, [message, updateCtx]);

  return null;
};

export default Communicator;
