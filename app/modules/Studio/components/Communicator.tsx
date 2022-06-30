import rdf, { Quadruple } from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import React from 'react';

import generateLRS from '../../../helpers/generateLRS';
import http from '../../../ontology/http';
import register from '../../../views';
import { seedToSlice } from '../../Common/lib/seed';
import { appContextEditor } from '../../Core/components/AppContext/appContext';
import ll from '../../Core/ontology/ll';
import { EditorEvents, EditorUpdateEvent } from '../lib/EditorUpdateEvent';
import { PageViewerState } from '../lib/PageViewerState';

const Communicator = (): null => {
  const updateCtx = React.useContext(appContextEditor);

  const [message, setMessage] = React.useState<PageViewerState | undefined>(undefined);

  React.useEffect(() => {
    if (window.opener) {
      const loaded = {
        type: EditorEvents.Loaded,
      };

      window.opener.postMessage(loaded, location.origin);
    }
  }, []);

  React.useEffect(() => {
    const listener = (e: MessageEvent<EditorUpdateEvent>) => {
      switch (e.data.type) {
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

    const { currentResource, doc: { seed } } = message;

    const updateContext = async () => {
      try {
        const slice = seedToSlice(seed, message.manifest.ontola.website_iri, window.EMP_SYMBOL_MAP);
        const next = await generateLRS(message.manifest, slice, window.EMP_SYMBOL_MAP);
        const { lrs } = next;
        const records = Object.keys(slice);

        if (records.length === 0) {
          updateCtx((prev) => ({
            ...prev,
            manifest: message.manifest,
            resource: currentResource,
            theme: message.manifest.ontola?.theme ?? 'common',
            themeOpts: message.manifest.ontola?.theme_options ?? prev.themeOpts,
            website: message.manifest.ontola?.website_iri ?? prev.website,
          }));

          return;
        }

        const statusUpdate = records
          .map<Quadruple>((s) => [
            s.startsWith('_') ? rdf.blankNode(s) : rdf.namedNode(s),
            http.statusCode,
            rdf.literal(HttpStatus.OK),
            ll.meta,
          ]);

        lrs.processDelta(statusUpdate, true);
        register(lrs);

        window.LRS = lrs;
        updateCtx((prev) => ({
          ...prev,
          lrs,
          manifest: message.manifest,
          resource: currentResource,
          theme: message.manifest.ontola?.theme ?? 'common',
          themeOpts: message.manifest.ontola?.theme_options ?? prev.themeOpts,
          website: message.manifest.ontola?.website_iri ?? prev.website,
        }));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    updateContext();
  }, [message, updateCtx]);

  return null;
};

export default Communicator;
