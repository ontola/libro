import {
  Component,
  ComponentName,
  ProjectContext,
  ResourceType,
  ServerData,
} from '../context/ProjectContext';

const INDENT = 4;

export const serverDataToProject = (data: ServerData): Partial<ProjectContext> => {
  const manifest: Component = {
    children: [],
    name: ComponentName.Manifest,
    type: ResourceType.Manifest,
    value: JSON.stringify(data.manifest, null, INDENT),
  };
  const website: Component = {
    children: data.resources,
    name: ComponentName.Website,
    type: ResourceType.RDF,
    value: '',
  };
  const sitemap: Component = {
    children: [],
    name: ComponentName.Sitemap,
    type: ResourceType.SiteMap,
    value: data.sitemap,
  };

  const websiteIRI = JSON.parse(manifest.value).ontola.website_iri;

  return {
    loading: false,
    manifest,
    sitemap,
    subResource: 0,
    website,
    websiteIRI,
  };
};
