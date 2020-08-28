import React from 'react';
import { handle } from '../../helpers/logging';

const useJSON = <T>(path: string) => {
  const [JSON, setJSON] = React.useState<T | undefined>(undefined);

  React.useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setJSON)
      .catch((e) => {
        handle(e);
      });
  }, [path]);

  return JSON;
};

export default useJSON;
