import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  ProjectAction,
  ProjectContextProps,
  currentComponent, 
} from '../../context/ProjectContext';

import { DataEditor } from './DataEditor';

interface CodeEditorProps extends ProjectContextProps {
  onMount?: () => void;
}

const EDITOR_DELAY = 300;

export const CodeEditor = ({ project, dispatch, onMount }: CodeEditorProps): JSX.Element => {
  const component = currentComponent(project);

  const [value, setValue] = React.useState(() => component.value);

  const [scheduleSave] = useDebouncedCallback<(v: string) => void>((next) => {
    dispatch({
      id: component.name,
      type: ProjectAction.UpdateComponent,
      value: next,
    });
  }, EDITOR_DELAY);

  React.useEffect(() => {
    setValue(component.value);
  }, [component]);

  return (
    <DataEditor
      resource={component}
      value={value}
      onChange={(v) => {
        setValue(v!);
        scheduleSave(v!);
      }}
      onMount={onMount}
    />
  );
};
