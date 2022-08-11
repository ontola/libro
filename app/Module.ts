/**
 * A registerable Libro module
 */
import type { NamedNode, Quadruple } from '@ontologies/core';
import type { ComponentRegistration } from 'link-lib';
import type { LinkReduxLRSType } from 'link-redux';

import { GenerateLRSOpts } from './helpers/generateLRS';

export type ViewRegistrations = Array<ComponentRegistration<any>>;

export enum ModuleType {
  Library = 'library',
  App = 'app',
}

export interface Module {
  name: string;
  topologies: NamedNode[];
  initialize?: (lrs: LinkReduxLRSType, options: GenerateLRSOpts) => void;
  type: ModuleType;
  seed: Quadruple[];
  views: ViewRegistrations;
}
