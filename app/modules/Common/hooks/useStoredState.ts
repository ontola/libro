import React, { Dispatch, SetStateAction } from 'react';

const useStoredState = <T = string, I = undefined>(
  key: string,
  initialValue: T | I,
  storage: Storage = localStorage,
  parseFromString: (x: string) => T | I = (x: string) => x as unknown as T | I,
  parseToString: (x: T) => string = (x: unknown) => x as string,
): [T | I, Dispatch<SetStateAction<T | I>>, () => T | I] => {
  const getValueRaw = React.useCallback(() => {
    const val = storage.getItem(key);

    return (val !== null ? parseFromString(val) : initialValue);
  }, [key, storage, initialValue]);

  const [stored, setValueRaw] = React.useState<T | I>(getValueRaw);

  const setValue = React.useCallback<Dispatch<SetStateAction<T | I>>>((value) => {
    if (value !== undefined) {
      storage.setItem(key, parseToString(value as T));
    } else {
      storage.removeItem(key);
    }

    setValueRaw(value);
  }, [key, storage]);

  return [stored, setValue, getValueRaw];
};

export default useStoredState;
