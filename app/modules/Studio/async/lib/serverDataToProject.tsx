import { HexJsonParser } from '../../../../helpers/transformers/hexjson';
import {
  Component,
  ComponentName,
  ProjectContext,
  ServerData,
} from '../context/ProjectContext';

import { subResourcesFromData } from './subResourcesFromData';
import { ResourceType } from './types';

const INDENT = 4;

export const serverDataToProject = (data: ServerData): Partial<ProjectContext> => {
  const manifest: Component = {
    children: [],
    name: ComponentName.Manifest,
    type: ResourceType.Manifest,
    value: JSON.stringify(data.manifest, null, INDENT),
  };

  const parser = new HexJsonParser();
  const resources = data.resources.length === 0
    ? subResourcesFromData(data.hextuples.map((h) => parser.hexArrayToQuad(h)), data.manifest.ontola.website_iri)
    : data.resources;
  const website: Component = {
    children: resources,
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
