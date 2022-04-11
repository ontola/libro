import { ProjectContext } from '../context/ProjectContext';

import { SubResource } from './types';

export const childrenToSource = (children: SubResource[]): string => {
  const childSources = children
    .map((r) => {
      if (r.value?.startsWith('[')) {
        return `...${r.value}`;
      }

      return r.value;

    })
    .join(',\n');

  return `[\n${childSources}\n]`;
};

export const projectToSource = (project: ProjectContext): string =>
  childrenToSource(project.website.children);
