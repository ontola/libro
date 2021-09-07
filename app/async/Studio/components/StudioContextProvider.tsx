import React from 'react';

import Spinner from '../../../components/Spinner';
import { studioContext } from '../context/StudioContext';
import { editorStateContext } from '../context/EditorStateContext';
import { serverDocumentsContext } from '../context/ServerDocumentsContext';
import { useEditorStateContext } from '../hooks/useEditorStateContext';
import { useStudio } from '../hooks/useStudio';
import { useServerDocumentsContext } from '../hooks/useServerDocumentsContext';

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
