import React from 'react';

import { handle } from '../helpers/logging';

const useJSON = <T>(path: string | undefined): T | undefined => {
  const [json, setJSON] = React.useState<T | undefined>(undefined);

  React.useEffect(() => {
    if (path) {
      fetch(path)
        .then((res) => res.json())
        .then(setJSON)
        .catch((e) => {
          handle(e);
        });
    }
  }, [path]);

  return json;
};

export default useJSON;
