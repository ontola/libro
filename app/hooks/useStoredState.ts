import React from 'react';

const useStoredState = (
  key: string,
  initialValue: string | undefined,
  storage: Storage = localStorage,
): [string | undefined, (v: string) => void] => {
  const [stored, setValue] = React.useState<string | undefined>(storage.getItem(key) || initialValue);

  React.useEffect(() => {
    if (stored) {
      storage.setItem(key, stored);
    } else {
      storage.removeItem(key);
    }
    setValue(stored);
  }, [stored]);

  return [stored, setValue];
};

export default useStoredState;
