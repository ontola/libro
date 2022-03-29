import React from 'react';

import { ProjectContext } from '../context/ProjectContext';
import { hashProjectData } from '../lib/hashProject';

export const useHasUnsavedChanges = (project: ProjectContext): boolean => {
  const currentHash = React.useMemo(() => hashProjectData(project), [project]);

  return currentHash !== project.serverDataHash;
};
