import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { EditorEvents, EditorUpdateEvent } from '../../lib/EditorUpdateEvent';
import { PageViewerState } from '../../lib/PageViewerState';
import {
  ComponentName,
  ProjectContext,
  selectedRecord,
} from '../context/ProjectContext';
import { flattenSeed } from '../lib/flattenSeed';

import { useNewDialogHandle } from './useDialogHandle';

const EDITOR_UPDATE_FREQ = 1000;

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
  if (project.current === ComponentName.Manifest) {
    return 'auto';
  }

  const path = project.subResource;

  if (!path || path === '/') {
    return 'auto';
  }

  return normalize(path, project.websiteIRI);
};

const projectToPageViewerState = (project: ProjectContext): PageViewerState => {
  const seed = flattenSeed(project.data);

  return {
    currentResource: subResourceIri(project),
    doc: {
      manifestOverride: JSON.stringify(project.manifest),
      seed: JSON.stringify(seed),
    },
    manifest: project.manifest,
  };
};

export const usePopoutViewer = ({ onClose, onOpen, project }: PopoutEditorProps): () => void => {
  const initialLoadListener = React.useRef<((e: MessageEvent<EditorUpdateEvent>) => void) | undefined>();

  const [recreateDialog, sendUpdate] = useNewDialogHandle(onOpen, onClose);

  const updateDoc = React.useCallback(() => {
    const message = {
      type: EditorEvents.EditorUpdate,
      viewOpts: projectToPageViewerState(project),
    };

    sendUpdate(message);
  }, [
    JSON.stringify(project.manifest),
    project.website.children,
    selectedRecord(project),
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
