import { NamedNode } from '@ontologies/core';
import { AttributeKey } from 'link-lib';

import { Module } from '../../../Module';

export const topologiesKey = new AttributeKey<NamedNode[]>('topologies');

export const modulesKey = new AttributeKey<Module[]>('modules');
