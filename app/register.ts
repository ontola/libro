import { LinkReduxLRSType } from 'link-redux';

import { componentRegistrations } from './components';
import { Module } from './Module';
import { getViews } from './views';

export default function register(lrs: LinkReduxLRSType, modules: Module[]): void {
  lrs.registerAll(...getViews(modules), ...componentRegistrations());
}
