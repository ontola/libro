import rdf, { isNode, Node } from '@ontologies/core';

import ontola from '../ontology/ontola';

interface JSONLDObject {
    '@id': Node;
    [key: string]: any;
}

export const destroyFieldName = btoa(ontola._destroy.value);

export function calculateFormFieldName(...segments: Array<string | number | Node | JSONLDObject | undefined>): string {
    return segments
        .map((segment) => {
            if (typeof segment === 'undefined') {
                return '';
            }
            if (typeof segment === 'number' || typeof segment === 'string') {
                return segment;
            }
            if (Object.prototype.hasOwnProperty.call(segment, '@id')) {
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

    const { [destroyFieldName]: ignore, ...rest } = value;

    return rest as JSONLDObject;
}

export function retrieveIdFromValue(value: JSONLDObject | Node | undefined): Node | undefined {
    if (typeof value === 'undefined' || isNode(value)) {
        return value;
    }

    return value['@id'];
}

export function isMarkedForRemove(value: any): boolean {
    if (!value) {
        return true;
    }

    const hasStatement = Object.prototype.hasOwnProperty.call(value, destroyFieldName);

    return hasStatement && rdf.equals(value[destroyFieldName], rdf.literal(true));
}

export function markForRemove(value: JSONLDObject): object | undefined {
    if (value && value['@id'] && value['@id'].termType === 'BlankNode') {
        return undefined;
    }

    return {
        '@id': value['@id'],
        [destroyFieldName]: rdf.literal(true),
    };
}
