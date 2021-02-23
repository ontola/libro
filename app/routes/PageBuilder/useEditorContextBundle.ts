import React from 'react';

import { builderContext } from './builderContext';

/**
 * Bundle of TS declarations used by the editor for autocompletion context.
 */
export interface EditorContextBundle {
  core: string;
  ontologies: { [k: string]: string };
  localOntologies: { [k: string]: string };
}

export const useEditorContextBundle = (): EditorContextBundle | undefined => {
  const { context, setContext } = React.useContext(builderContext);

  React.useEffect(() => {
    fetch('/d/builder/editorContext.bundle.json')
      .then((response) => response.text())
      .then((response) => setContext(JSON.parse(response)));
  }, []);

  return context;
};
