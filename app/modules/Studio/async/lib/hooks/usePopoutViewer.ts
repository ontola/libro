import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { WebManifest } from '../../../../../appContext';
import { defaultManifest } from '../../../../../helpers/defaultManifest';
import { handle } from '../../../../../helpers/logging';
import { studioContext } from '../context/StudioContext';
import { editorStateContext } from '../context/EditorStateContext';
import { PageViewerState } from '../../../lib/PageViewerState';

import { useDialogHandle } from './useDialogHandle';

const EDITOR_UPDATE_FREQ = 300;

interface PopoutEditorProps {
  onClose: () => void;
  onOpen: () => void;
}

export const usePopoutViewer = ({ onClose, onOpen }: PopoutEditorProps): () => void => {
  const { source, resources, files } = React.useContext(studioContext);
  const { resourceIndex } = React.useContext(editorStateContext);

  const [docSetter, setDocSetter] = React.useState<(doc: PageViewerState) => void>(() => undefined);
  const [manifest, setManifest] = React.useState<WebManifest>(defaultManifest('https://changeme.localdev'));

  const recreateDialog = useDialogHandle(onClose, onOpen, setDocSetter);

  const sendUpdate = React.useCallback(() => {
    if (docSetter) {
      docSetter({
        currentResource: resourceIndex === -1 ? 'auto' : resources[resourceIndex]?.value,
        doc: {
          manifestOverride: '{}',
          source: source ?? '',
        },
        manifest,
      });
    }
  }, [source, docSetter, resources, resourceIndex, manifest]);

  const [delayedUpdate] = useDebouncedCallback(sendUpdate, EDITOR_UPDATE_FREQ);

  React.useEffect(() => {
    try {
      const manifestFile = files.find((f) => f.name === 'manifest.json')!;
      const next = JSON.parse(manifestFile.value);
      setManifest(next);
    } catch (e) {
      handle(e);
    }
  }, [files]);

  React.useEffect(() => {
    delayedUpdate();
  }, [source, docSetter, resources, resourceIndex, manifest]);

  return recreateDialog;
};
