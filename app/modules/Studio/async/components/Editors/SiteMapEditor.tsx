import React from 'react';

import { ProjectContextReaderProps } from '../../context/ProjectContext';
import { useSitemap } from '../../hooks/useSitemap';

import { DataEditor } from './DataEditor';

export const SiteMapEditor = ({ project }: ProjectContextReaderProps): JSX.Element => {
  const sitemap = useSitemap(project);

  return (
    <DataEditor
      options={{
        codeLens: false,
        readOnly: true,
        wrappingIndent: 'indent',
      }}
      resource={project.sitemap}
      value={sitemap}
    />
  );
};
