import React, { Dispatch, SetStateAction } from 'react';

const useStoredState = (
  key: string,
  initialValue: string | undefined,
  storage: Storage = localStorage,
): [string | undefined, Dispatch<SetStateAction<string | undefined>>] => {
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
