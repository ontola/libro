import { Node, Quad } from '@ontologies/core';

export type ToDataObject = (
  id: Node,
  data: Quad[],
  websiteIRI: string,
  indentation?: number,
) => string | undefined;

export interface RenderedPage {
  path: string;
  content: string;
  sheet: string;
}

// Keep in sync with /cache/src/commonMain/kotlin/io/ontola/studio/Project.kt
export enum ResourceType {
  RDF = 'RDF',
  Manifest = 'Manifest',
  Elements = 'Elements',
  MediaObject = 'MediaObject',
  SiteMap = 'SiteMap',
  Distributions = 'Distributions',
}

export interface Editable {
  type: ResourceType;
  name: string;
}

export interface SubResource extends Editable {
  id: number;
  path: string;
  prerender?: RenderedPage;
  value: string;
}

export enum NodeType {
  StringValue,
  LocalPath,
  Shorthand,
}

export interface NodeProperty {
  type: NodeType;
  value: string;
}
