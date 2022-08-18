import { NamedNode } from '@ontologies/core';
import { AttributeKey } from 'link-lib';

import app from '../../Common/ontology/app';

export const StartSignIn = new AttributeKey<(redirectUrl?: NamedNode) => Promise<void>>(app.ns('startSignIn').value);
export const StartSignOut = new AttributeKey<(redirect?: NamedNode) => Promise<void>>(app.ns('startSignOut').value);
