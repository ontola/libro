import { BlankNode, Literal, NamedNode, SomeNode } from 'rdflib';
import { NS } from './LinkedRenderStore';

interface JSONLDObject {
    '@id': SomeNode;
    [key: string]: any;
}

const destroyFieldName = btoa(NS.ontola('_destroy').value);

export function calculateFormFieldName(...segments: Array<string | number | SomeNode | JSONLDObject | undefined>) {
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

export function retrieveIdFromValue(value: JSONLDObject | SomeNode | undefined): SomeNode | undefined {
    if (typeof value === 'undefined' ||  value instanceof NamedNode || value instanceof BlankNode) {
        return value;
    }

    return value['@id'];
}

export function isMarkedForRemove(value: any): boolean {
    if (!value) {
        return true;
    }

    const hasStatement = Object.prototype.hasOwnProperty.call(value, destroyFieldName);

    return hasStatement && value[destroyFieldName] === Literal.fromBoolean(true);
}

export function markForRemove(value: JSONLDObject): object | undefined {
    if (value && value['@id'] && value['@id'].termType === 'BlankNode') {
        return undefined;
    }

    return {
        '@id': value['@id'],
        [calculateFormFieldName(NS.ontola('_destroy'))]: Literal.fromBoolean(true),
    };
}
