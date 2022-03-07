import rdf, { QuadPosition, Quadruple } from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import React from 'react';

import { appContextEditor } from '../../../appContext';
import generateLRS from '../../../helpers/generateLRS';
import { quadruplesToDataSlice } from '../../../helpers/quadruplesToDataSlice';
import http from '../../../ontology/http';
import ll from '../../../ontology/ll';
import register from '../../../views';
import { EditorEvents, EditorUpdateEvent } from '../lib/EditorUpdateEvent';
import { PageViewerState } from '../lib/PageViewerState';
import parseToGraph from '../lib/parseToGraph';

const extractSubject = (q: Quadruple) => q[QuadPosition.subject];

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

    const updateContext = async () => {
      try {
        const graphs = parseToGraph(source, website_iri);
        const data = graphs.flatMap(([_, rdfIndex]) => (rdfIndex as RDFIndex).quads);
        const next = await generateLRS(message.manifest, quadruplesToDataSlice(data));
        const { lrs } = next;

        const statusUpdate = Array.from(new Set(data.map(extractSubject)))
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
