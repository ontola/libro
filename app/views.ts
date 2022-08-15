/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import { ComponentRegistration } from 'link-lib';

import { Module, ModuleType } from './Module';

export function getViews(modules: Module[]): Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>> {
  const libraries = modules
    .filter((it) => it.type === ModuleType.Library)
    .map((it) => it.views);

  const apps = modules
    .filter((it) => it.type === ModuleType.App)
    .map((it) => it.views);

  return [
    ...libraries,
    ...apps,
  ];
}

