import React from 'react';

import Spinner from '../../../../components/Spinner';
import { studioContext } from '../lib/context/StudioContext';
import { editorStateContext } from '../lib/context/EditorStateContext';
import { serverDocumentsContext } from '../lib/context/ServerDocumentsContext';
import { useEditorStateContext } from '../lib/hooks/useEditorStateContext';
import { useStudio } from '../lib/hooks/useStudio';
import { useServerDocumentsContext } from '../lib/hooks/useServerDocumentsContext';

export const StudioContextProvider: React.FC = ({ children }) => {
  const editorStateCtx = useEditorStateContext();
  const serverDocumentsCtx = useServerDocumentsContext();
  const [ctx] = useStudio();

  if (!ctx) {
    return <Spinner loading />;
  }

  return (
    <editorStateContext.Provider value={editorStateCtx}>
      <serverDocumentsContext.Provider value={serverDocumentsCtx}>
        <studioContext.Provider value={ctx}>
          {children}
        </studioContext.Provider>
      </serverDocumentsContext.Provider>
    </editorStateContext.Provider>
  );
};
