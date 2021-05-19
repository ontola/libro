import React, { Dispatch, SetStateAction } from 'react';

const useStoredState = <T = string>(
  key: string,
  initialValue: T | undefined,
  storage: Storage = localStorage,
  parseFromString: (x: string | null) => T = (x: unknown) => x as T,
  parseToString: (x: T) => string = (x: unknown) => x as string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [stored, setValue] = React.useState<T | undefined>(storage.getItem(key) !== null ? parseFromString(storage.getItem(key)) : initialValue);

  React.useEffect(() => {
    if (stored !== undefined) {
      storage.setItem(key, parseToString(stored));
    } else {
      storage.removeItem(key);
    }
    setValue(stored);
  }, [stored]);

  return [stored, setValue];
};

export default useStoredState;
