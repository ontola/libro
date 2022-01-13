import React from 'react';

import { studioContext } from '../context/StudioContext';

/**
 * Bundle of TS declarations used by the editor for autocompletion context.
 */
export interface EditorContextBundle {
  core: string;
  ontologies: { [k: string]: string };
  localOntologies: { [k: string]: string };
}

export const useStudioContextBundle = (): EditorContextBundle | undefined => {
  const { context, setContext } = React.useContext(studioContext);

  React.useEffect(() => {
    fetch('/_studio/editorContext.bundle.json')
      .then((response) => response.text())
      .then((response) => setContext(JSON.parse(response)));
  }, []);

  return context;
};
