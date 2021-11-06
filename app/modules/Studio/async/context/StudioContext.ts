import React from 'react';

import { EditorContextBundle } from '../hooks/useStudioContextBundle';

export interface StudioContext {
  context: EditorContextBundle | undefined;
  setContext: (c: EditorContextBundle) => void;
}

export const studioContext = React.createContext<StudioContext>({
  context: undefined,
  setContext: (_: EditorContextBundle) => undefined,
});
