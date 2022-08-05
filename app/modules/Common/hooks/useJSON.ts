import HttpStatus from 'http-status-codes';
import React from 'react';

import { handle } from '../../../helpers/logging';

const useJSON = <T>(path: string | undefined): [data: T | undefined, retry: () => void, status: number | undefined] => {
  const [status, setStatus] = React.useState<number | undefined>(undefined);
  const [json, setJSON] = React.useState<T | undefined>(undefined);

  const reload = React.useCallback(() => {
    if (path) {
      fetch(path, { headers: { Accept: 'application/json' } })
        .then((res) => {
          setStatus(res.status);

          if (res.status === HttpStatus.OK) {
            return res.json().then((body) => {
              setJSON(body);
            });
          }

          return Promise.reject();
        })
        .catch((e) => {
          handle(e);
        });
    }
  }, [path]);

  React.useEffect(() => {
    reload();
  }, [path, reload]);

  return [json, reload, status];
};

export default useJSON;
