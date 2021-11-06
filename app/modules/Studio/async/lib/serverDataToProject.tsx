import {
  Component,
  ComponentName,
  ProjectContext,
  ResourceType,
  ServerData,
  SubResource,
} from '../context/ProjectContext';

const tryParseResources = (resources: string): SubResource[] => {
  try {
    return JSON.parse(resources) || [];
  } catch {
    return [];
  }
};

export const serverDataToProject = (data: ServerData): Partial<ProjectContext> => {
  const manifest: Component = {
    children: [],
    name: ComponentName.Manifest,
    type: ResourceType.Manifest,
    value: data.manifestOverride,
  };
  const website: Component = {
    children: tryParseResources(data.resources),
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
