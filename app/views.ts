/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import { ComponentRegistration } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { componentRegistrations } from './components';
import { ModuleType } from './Module';
import { modules } from './modules';
import { modulesKey } from './modules/Kernel/lib/settings';

export function getViews(): Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>> {
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

export default function register(lrs: LinkReduxLRSType): void {
  lrs.settings.set(modulesKey, modules);
  lrs.registerAll(...getViews(), ...componentRegistrations());
}
