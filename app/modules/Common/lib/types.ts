import type { NamedNode, SomeTerm } from '@ontologies/core';
import type { LinkedDataObject, TermOpts } from 'link-redux';

interface Shape {
  [key: string]: NamedNode;
}

export type ResourceLink<T extends Shape> = LinkedDataObject<T, TermOpts, SomeTerm | undefined>;
