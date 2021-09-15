import React, { Dispatch, SetStateAction } from 'react';

const useStoredState = <T = string>(
  key: string,
  initialValue: T | undefined,
  storage: Storage = localStorage,
  parseFromString: (x: string | null) => T = (x: unknown) => x as T,
  parseToString: (x: T) => string = (x: unknown) => x as string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => T | undefined] => {
  const getValueRaw = React.useCallback(
    () => (storage.getItem(key) !== null ? parseFromString(storage.getItem(key)) : initialValue),
    [key, storage, initialValue],
  );
  const [stored, setValueRaw] = React.useState<T | undefined>(getValueRaw);

  const setValue = React.useCallback((value) => {
    if (value !== undefined) {
      storage.setItem(key, parseToString(value));
    } else {
      storage.removeItem(key);
    }

    setValueRaw(value);
  }, [key, storage]);

  return [stored, setValue, getValueRaw];
};

export default useStoredState;
