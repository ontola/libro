/**
 * A registerable Libro module
 */
import type { NamedNode } from '@ontologies/core';
import type { ComponentRegistration } from 'link-lib';

export type ViewRegistrations = Array<ComponentRegistration<any>>;

export enum ModuleType {
  Library = 'library',
  App = 'app',
}

export interface Module {
  name: string;
  topologies: NamedNode[];
  type: ModuleType;
  views: ViewRegistrations;
}
