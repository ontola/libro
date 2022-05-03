import { Node } from '@ontologies/core';
import React from 'react';

import { ProjectContext } from '../context/ProjectContext';
import { projectToSource } from '../lib/projectToSource';

import { parseSource } from './useGenerateLRSFromSource';

const BLACKLIST_PATTERNS = [
  '<',
  '#',
  'menus/footer',
];

export const filterNodes = (resources: Node[]): string[] => resources
  .filter((r) => !BLACKLIST_PATTERNS.some((bp) => r.value.includes(bp)))
  .map((r) => r.value);

export const nodesToSitemap = (resources: Node[]): string => filterNodes(resources).join('\n');

export const useSitemap = (project: ProjectContext): string =>
  React.useMemo(() => {
    const [resources] = parseSource(projectToSource(project), project.websiteIRI);

    return filterNodes(resources).join('\n');
  }, [project]);
