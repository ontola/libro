import React from 'react';

/**
 * Creates a new KeyboardEvent that calls the given event when a given key is pressed.
 * Usefull for when you need to add click event to a non interactive elements since they will then also require keyboard events.
 * @param event a function that is called whenever the key is pressed
 * @param key The key that triggers the event, defaults to 'Enter'.
 * @returns a keyboard event handler
 */
export const useConvertToKeyEvent = <E = Element>(event?: () => unknown, key = 'Enter'): React.KeyboardEventHandler<E> =>
  React.useCallback<React.KeyboardEventHandler<E>>((e) => {
    if (e.key === key) {
      event?.();
    }
  }, [key, event]);
