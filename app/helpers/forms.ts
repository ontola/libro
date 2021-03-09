import rdf, {
  Literal,
  Node,
  Term,
  isNode,
} from '@ontologies/core';

import ontola from '../ontology/ontola';

import { isJSONLDObject } from './types';

export interface JSONLDObject {
    '@id': Node;
    [key: string]: any;
}

export const destroyFieldName = btoa(ontola._destroy.value);

export function calculateFormFieldName(...segments: Array<string | number | Term | JSONLDObject | undefined>): string {
    return segments
        .map((segment) => {
            if (typeof segment === 'undefined') {
                return '';
            }
            if (typeof segment === 'number' || typeof segment === 'string') {
                return segment;
            }
            if (isJSONLDObject(segment)) {
                return btoa((segment as JSONLDObject)['@id'].value);
            }

            return btoa(segment.value);
        })
        .filter((v) => typeof v === 'number' || Boolean(v))
        .join('.');
}

export function clearRemoval(value: JSONLDObject | undefined): JSONLDObject | undefined {
    if (!value) {
        return value;
    }

    const { [destroyFieldName]: ignored, ...rest } = value;

    return rest as JSONLDObject;
}

export function retrieveIdFromValue(value: JSONLDObject | Node | Literal | undefined): Node | undefined {
    if (isJSONLDObject(value)) {
        return value['@id'];
    }

    if (typeof value === 'undefined' || isNode(value)) {
        return value;
    }

    return undefined;
}

export function isMarkedForRemove(value: Record<string, unknown> | any): boolean {
    if (!value) {
        return true;
    }

    const hasStatement = Object.prototype.hasOwnProperty.call(value, destroyFieldName);

    return hasStatement && rdf.equals(value[destroyFieldName], rdf.literal(true));
}
