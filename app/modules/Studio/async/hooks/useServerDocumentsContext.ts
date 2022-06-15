import React from 'react';

import useJSON from '../../../Common/hooks/useJSON';
import { ServerDocumentsContext } from '../context/ServerDocumentsContext';

export const useServerDocumentsContext = (): ServerDocumentsContext => {
  const [documents, reload] = useJSON<string[]>('/_studio/projects');

  const [ctx, setCtx] = React.useState<ServerDocumentsContext>({
    documents,
    reload,
  });

  React.useEffect(() => {
    setCtx({
      documents,
      reload,
    });
  }, [documents]);

  return ctx;
};
