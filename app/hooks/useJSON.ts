import React from 'react';

import { handle } from '../helpers/logging';

const useJSON = <T>(path: string | undefined): [data: T | undefined, retry: () => void] => {
  const [json, setJSON] = React.useState<T | undefined>(undefined);

  const reload = React.useCallback(() => {
    if (path) {
      fetch(path, { headers: { Accept: 'application/json' } })
        .then((res) => res.json())
        .then(setJSON)
        .catch((e) => {
          handle(e);
        });
    }
  }, [path]);

  React.useEffect(() => {
    reload();
  }, [path, reload]);

  return [json, reload];
};

export default useJSON;
