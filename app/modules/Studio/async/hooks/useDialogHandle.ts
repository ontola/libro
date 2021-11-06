import React from 'react';

import useStoredState from '../../../../hooks/useStoredState';
import { EditorEvents, EditorUpdateEvent } from '../../lib/EditorUpdateEvent';

const CLOSE_UPDATE_TIMEOUT = 10;
const BACKGROUND_WINDOW_MOVE_TIMEOUT = 250;

export type DialogHandle = [reopener: () => void, sendUpdate: (message: EditorUpdateEvent) => void];

export const useNewDialogHandle = (
  onOpen: () => void,
  onClose: () => void,
): DialogHandle => {
  const [width, setWidth] = useStoredState('studio.dialoghandle.width', '1024');
  const [height, setHeight] = useStoredState('studio.dialoghandle.height', '768');
  const [left, setLeft] = useStoredState('studio.dialoghandle.left', '200');
  const [top, setTop] = useStoredState('studio.dialoghandle.top', '200');
  const [handle, setHandle] = React.useState<Window | null>(null);
  const checkIntervalHandle = React.useRef<number | undefined>(undefined);

  const createWindow = React.useCallback(() => {
    const nextHandle = window.open(
      '/d/studio/viewer',
      'studio_viewer',
      `width=${width},height=${height},left=${left},top=${top},menubar,scrollbars,status`,
    );
    setHandle(nextHandle);

    if (!nextHandle) {
      throw new Error("Couldn't open dialog");
    }
  }, [handle]);

  const sendUpdate = React.useCallback((message: EditorUpdateEvent) => {
    if (handle === null) {
      return;
    }

    handle.postMessage(message, location.origin);
  }, [handle]);

  const handleUnload = React.useCallback(() => {
    if (!handle) {
      return;
    }

    try {
      onClose();
      handle.postMessage({ type: EditorEvents.EditorClose }, location.origin);
    } finally {
      handle.close();

      if (handle.closed) {
        setHandle(null);
      }
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
    if (!handle) {
      return;
    }

    const closedHandler = () => {
      setTimeout(() => {
        if (handle.closed) {
          handleUnload();
        }
      }, CLOSE_UPDATE_TIMEOUT);
    };

    let lastTop = top;
    let lastLeft = left;

    const mouseOutHandler = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        checkIntervalHandle.current = handle.setInterval(() => {
          if (lastTop !== handle.screenTop.toString()) {
            lastTop = handle.screenTop.toString();
            setTop(lastTop);
          }

          if (lastLeft !== handle.screenLeft.toString()) {
            lastLeft = handle.screenLeft.toString();
            setLeft(lastLeft);
          }
        }, BACKGROUND_WINDOW_MOVE_TIMEOUT);
      } else {
        handle.clearInterval(checkIntervalHandle.current);
      }
    };

    const resizeHandler = () => {
      if (!handle) {
        return;
      }

      setHeight(handle.innerHeight.toString());
      setWidth(handle.innerWidth.toString());
    };

    onOpen();
    addEventListener('unload', handleUnload);
    handle?.addEventListener('resize', resizeHandler);
    handle?.addEventListener('mouseout', mouseOutHandler);
    handle?.addEventListener('unload', closedHandler);

    return () => {
      removeEventListener('unload', handleUnload);
      handle?.removeEventListener('resize', resizeHandler);
      handle?.removeEventListener('mouseout', mouseOutHandler);
      handle?.removeEventListener('unload', closedHandler);
    };
  }, [handle, handleUnload, onOpen]);

  const reopenDialog = React.useCallback(() => {
    destructWindow();
    createWindow();
  }, [handle]);

  React.useEffect(() => destructWindow, [destructWindow]);

  React.useEffect(() => installUnload(), [handle]);

  return [reopenDialog, sendUpdate];
};

