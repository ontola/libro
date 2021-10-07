import React from 'react';

import { EditorEvents, EditorUpdateEvent } from '../../../lib/EditorUpdateEvent';
import { PageViewerState } from '../../../lib/PageViewerState';

type DocSetterSetter =  React.Dispatch<React.SetStateAction<(doc: PageViewerState) => void>>;

const CLOSE_UPDATE_TIMEOUT = 10;

export const useDialogHandle = (
  onClose: () => void,
  onOpen: () => void,
  setDocSetter: DocSetterSetter,
): () => void => {
  const [bundle, setBundle] = React.useState<[Window, (opts: PageViewerState) => void] | undefined>(undefined);
  const [handle, eventMessenger] = bundle ?? [];

  const createWindow = React.useCallback(() => {
    const nextHandle = window.open(
      '/d/studio/viewer',
      'studio_viewer',
      'width=1024,height=768,left=200,top=200,menubar,scrollbars,status',
    );

    onOpen();

    if (!nextHandle) {
      throw new Error("Couldn't open dialog");
    }

    const nextMessenger = (opts: PageViewerState) => {
      const update: EditorUpdateEvent = {
        type: EditorEvents.EditorUpdate,
        viewOpts: opts,
      };

      nextHandle.postMessage(update, '*');
    };

    setBundle([nextHandle, nextMessenger]);
  }, [handle, onOpen]);

  const handleUnload = React.useCallback(() => {
    if (!handle) {
      return;
    }

    try {
      onClose();
      handle.postMessage({ type: EditorEvents.EditorClose }, '*');
    } finally {
      handle.close();
    }
  }, [handle, onClose]);

  const destructWindow = React.useCallback(() => {
    try {
      removeEventListener('unload', handleUnload);
      handle?.removeEventListener('close', handleUnload);
    } finally {
      handleUnload();
    }
  }, [handle]);

  const installUnload = React.useCallback(() => {
    onOpen();
    setDocSetter(() => eventMessenger);
    addEventListener('unload', handleUnload);
    handle?.addEventListener('unload', () => {
      setTimeout(() => {
        if (handle.closed) {
          handleUnload();
        }
      }, CLOSE_UPDATE_TIMEOUT);
    });
  }, [handle, handleUnload, onOpen]);

  const reopenDialog = React.useCallback(() => {
    destructWindow();
    createWindow();
  }, [handle]);

  React.useEffect(() => destructWindow, [destructWindow]);

  React.useEffect(() => installUnload(), [handle]);

  return reopenDialog;
};
