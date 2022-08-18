import { Node } from '@ontologies/core';
import { AttributeKey } from 'link-lib';

import app from '../../Common/ontology/app';

export const SetSearchTarget = new AttributeKey<(target: Node) =>
  Promise<void>>(app.ns('setSearchTarget').value);
