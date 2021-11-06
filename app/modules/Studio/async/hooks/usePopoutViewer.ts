import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { EditorEvents, EditorUpdateEvent } from '../../lib/EditorUpdateEvent';
import { ProjectContext } from '../context/ProjectContext';
import { PageViewerState } from '../../lib/PageViewerState';
import { projectToSource } from '../lib/projectToSource';

import { useNewDialogHandle } from './useDialogHandle';

const EDITOR_UPDATE_FREQ = 300;

interface PopoutEditorProps {
  onClose: () => void;
  onOpen: () => void;
  project: ProjectContext;
}

const projectToPageViewerState = (project: ProjectContext): PageViewerState => {
  const source = projectToSource(project);

  return {
    currentResource: 'auto',
    doc: {
      manifestOverride: project.manifest.value,
      source,
    },
    manifest: JSON.parse(project.manifest.value),
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
    project.manifest.value,
    project.website.children,
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
      window.addEventListener('message', nextListener);
    };
  }, [updateDoc]);

  React.useEffect(() => {
    delayedUpdate();
  }, [project, delayedUpdate]);

  return recreateDialog;
};
