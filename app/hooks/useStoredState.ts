import React, { Dispatch, SetStateAction } from 'react';

const useStoredState = <T = string>(
  key: string,
  initialValue: T | undefined,
  storage: Storage = localStorage,
  parseFromString: (x: string | null) => T = (x: unknown) => x as T,
  parseToString: (x: T) => string = (x: unknown) => x as string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const resolvedInitialValue = storage.getItem(key) !== null ? parseFromString(storage.getItem(key)) : initialValue;
  const [stored, setValueRaw] = React.useState<T | undefined>(resolvedInitialValue);
  const setValue = React.useCallback((value) => {
    if (value !== undefined) {
      storage.setItem(key, parseToString(value));
    } else {
      storage.removeItem(key);
    }

    setValueRaw(value);
  }, [key, setValueRaw, storage, parseToString]);

  return [stored, setValue];
};

export default useStoredState;
