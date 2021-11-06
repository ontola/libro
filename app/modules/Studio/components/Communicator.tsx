import rdf, { Quadruple } from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import React from 'react';

import { appContextEditor } from '../../../appContext';
import generateLRS from '../../../helpers/generateLRS';
import http from '../../../ontology/http';
import ll from '../../../ontology/ll';
import register from '../../../views';
import parseToGraph from '../lib/parseToGraph';
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

    const { currentResource, doc: { source }, manifest: { ontola: { website_iri } } } = message;

    try {
      const graphs = parseToGraph(source, website_iri);
      const data = graphs.flatMap(([_, rdfIndex]) => (rdfIndex as RDFIndex).quads);
      const next = generateLRS(message.manifest, data);

      next.then(({ lrs }) => {
        const statusUpdate = Array.from(new Set(data.map((q) => q.subject)))
          .map<Quadruple>((s) => [
            s,
            http.statusCode,
            rdf.literal(HttpStatus.OK),
            ll.meta,
          ]);

        if (statusUpdate.length === 0) {
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

        lrs.processDelta(statusUpdate, true);
        register(lrs);

        updateCtx((prev) => ({
          ...prev,
          lrs,
          manifest: message.manifest,
          resource: currentResource,
          theme: message.manifest.ontola?.theme ?? 'common',
          themeOpts: message.manifest.ontola?.theme_options ?? prev.themeOpts,
          website: message.manifest.ontola?.website_iri ?? prev.website,
        }));
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.debug(err);
    }
  }, [message, updateCtx]);

  return null;
};

export default Communicator;
