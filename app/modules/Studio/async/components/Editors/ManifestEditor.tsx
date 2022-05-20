import React from 'react';

import { handle } from '../../../../../helpers/logging';
import { ProjectAction, projectContext } from '../../context/ProjectContext';
import { ResourceType } from '../../lib/types';

import { DataEditor } from './DataEditor';

const INDENT = 4;

export interface ManifestEditorProps {
  onMount?: () => void;
}

export const ManifestEditor = ({ onMount }: ManifestEditorProps): JSX.Element => {
  const [project, dispatch] = React.useContext(projectContext);

  return (
    <DataEditor
      resourceType={ResourceType.Manifest}
      value={JSON.stringify(project.manifest, null, INDENT)}
      onChange={(v) => {
        if (v) {
          try {
            dispatch({
              type: ProjectAction.UpdateManifest,
              value: JSON.parse(v),
            });
          } catch(e) {
            handle(e);
          }
        }
      }}
      onMount={onMount}
    />
  );
};
