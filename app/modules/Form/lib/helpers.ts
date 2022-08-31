import rdf, {
  Literal,
  Node,
  Term,
  isNode,
} from '@ontologies/core';

import ontola from '../../Kernel/ontology/ontola';

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

export function clearFormStorage(formID: string): void {
  if (__CLIENT__) {
    Object.keys(sessionStorage).forEach((k) => k.startsWith(formID) && sessionStorage.removeItem(k));
  }
}

export const isJSONLDObject = (value: unknown): value is JSONLDObject => (
  Object.prototype.hasOwnProperty.call(value, '@id')
);

export function retrieveIdFromValue(value: JSONLDObject | Node | Literal | undefined): Node | undefined {
  if (typeof value === 'undefined' || isNode(value)) {
    return value;
  }

  if (isJSONLDObject(value)) {
    return idFromJSONLDObject(value);
  }

  return undefined;
}

export function idFromJSONLDObject(value: JSONLDObject): Node {
  return value['@id'];
}

export function isMarkedForRemove(value: Record<string, unknown> | any): boolean {
  if (!value) {
    return true;
  }

  const hasStatement = Object.prototype.hasOwnProperty.call(value, destroyFieldName);

  return hasStatement && rdf.equals(value[destroyFieldName], rdf.literal(true));
}
