import React from 'react';

import useJSON from '../../../Common/hooks/useJSON';
import { ServerDocumentsContext } from '../context/ServerDocumentsContext';

export const useServerDocumentsContext = (): ServerDocumentsContext => {
  const [documents, reload, status] = useJSON<string[]>('/_studio/projects');

  const [ctx, setCtx] = React.useState<ServerDocumentsContext>({
    documents,
    reload,
    status: status ?? 0,
  });

  React.useEffect(() => {
    setCtx({
      documents,
      reload,
      status: status ?? 0,
    });
  }, [documents, status]);

  return ctx;
};
