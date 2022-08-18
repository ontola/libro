import { Node } from '@ontologies/core';
import { AttributeKey } from 'link-lib';

import app from '../../Common/ontology/app';

export const ChangePage = new AttributeKey<(subject: Node, newPage: Node) => void>(app.ns('changePage').value);
