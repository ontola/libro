import React from 'react';

import Spinner from '../../../Core/components/Loading/Spinner';
import { editorStateContext } from '../context/EditorStateContext';
import { serverDocumentsContext } from '../context/ServerDocumentsContext';
import { studioContext } from '../context/StudioContext';
import { useEditorStateContext } from '../hooks/useEditorStateContext';
import { useServerDocumentsContext } from '../hooks/useServerDocumentsContext';
import { useStudio } from '../hooks/useStudio';

export const StudioContextProvider: React.FC = ({ children }) => {
  const editorStateCtx = useEditorStateContext();
  const serverDocumentsCtx = useServerDocumentsContext();
  const [ctx] = useStudio();

  if (!ctx) {
    return <Spinner />;
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
