import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import { Quadruple } from '@ontologies/core';

import { WebManifest } from '../../../../WebManifest';
import { EditorEvents, EditorUpdateEvent } from '../../lib/EditorUpdateEvent';
import parseToGraph from '../../lib/parseToGraph';
import { ProjectContext, subResource } from '../context/ProjectContext';
import { PageViewerState } from '../../lib/PageViewerState';
import { graphToSeed } from '../lib/graphToSeed';
import { projectToSource } from '../lib/projectToSource';
import { handle } from '../../../../helpers/logging';

import { useNewDialogHandle } from './useDialogHandle';

const EDITOR_UPDATE_FREQ = 2000;

interface PopoutEditorProps {
  onClose: () => void;
  onOpen: () => void;
  project: ProjectContext;
}

const normalize = (urlOrPath: string, websiteIRI: string) => {
  try {
    return new URL(urlOrPath).toString();
  } catch (e) {
    return `${websiteIRI}${urlOrPath}`;
  }
};

const subResourceIri = (project: ProjectContext): string => {
  const path = subResource(project)?.path;

  if (!path || path === '/') {
    return 'auto';
  }

  return normalize(path, project.websiteIRI);
};

const projectToPageViewerState = (project: ProjectContext, lrs: LinkReduxLRSType): PageViewerState => {
  const source = projectToSource(project);
  const manifest = JSON.parse(project.manifest.value) as WebManifest;
  let quads: Quadruple[] = [];

  try {
    quads = parseToGraph(source, manifest.ontola.website_iri, true)
      .flatMap(([, it]) => it.quads);
  } catch (e) {
    handle(e);
    lrs.actions.ontola.showSnackbar('Could not parse data');
  }

  const slice = graphToSeed(quads);

  return {
    currentResource: subResourceIri(project),
    doc: {
      manifestOverride: project.manifest.value,
      seed: JSON.stringify(slice),
    },
    manifest,
  };
};

export const usePopoutViewer = ({ onClose, onOpen, project }: PopoutEditorProps): () => void => {
  const initialLoadListener = React.useRef<((e: MessageEvent<EditorUpdateEvent>) => void) | undefined>();
  const lrs = useLRS();

  const [recreateDialog, sendUpdate] = useNewDialogHandle(onOpen, onClose);

  const updateDoc = React.useCallback(() => {
    const message = {
      type: EditorEvents.EditorUpdate,
      viewOpts: projectToPageViewerState(project, lrs),
    };

    sendUpdate(message);
  }, [
    project.manifest.value,
    project.website.children,
    project.subResource,
    sendUpdate,
  ]);

  const [delayedUpdate] = useDebouncedCallback(updateDoc, EDITOR_UPDATE_FREQ);

  React.useEffect(() => {
    if (initialLoadListener.current) {
      window.removeEventListener('message', initialLoadListener.current);
    }

    const nextListener = (e: MessageEvent<EditorUpdateEvent>) => {
      if (e.data.type === EditorEvents.Loaded) {
        updateDoc();
      }
    };

    initialLoadListener.current = nextListener;
    window.addEventListener('message', nextListener);

    return () => {
      window.removeEventListener('message', nextListener);
    };
  }, [updateDoc]);

  React.useEffect(() => {
    delayedUpdate();
  }, [project, delayedUpdate]);

  return recreateDialog;
};
