import { NamedNode, Node } from '@ontologies/core';
import { AttributeKey } from 'link-lib';

import app from '../modules/Common/ontology/app';

export const StartSignIn = new AttributeKey<(redirectUrl?: NamedNode) => Promise<void>>(app.ns('startSignIn').value);
export const StartSignOut = new AttributeKey<(redirect?: NamedNode) => Promise<void>>(app.ns('startSignOut').value);
export const ChangePage = new AttributeKey<(subject: Node, newPage: Node) => void>(app.ns('changePage').value);
export const SetSearchTarget = new AttributeKey<(target: Node) => Promise<void>>(app.ns('setSearchTarget').value);
