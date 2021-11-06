import React from 'react';

import { StudioContext } from '../context/StudioContext';

import { EditorContextBundle } from './useStudioContextBundle';

export const useStudio = (): [StudioContext | undefined] => {
  const [context, setContext] = React.useState<EditorContextBundle | undefined>(undefined);
  const [ctx, setCtx] = React.useState<StudioContext | undefined>();

  React.useEffect(() => {
    setCtx({
      context,
      setContext,
    });
  }, [
    context,
  ]);

  return [ctx];
};
