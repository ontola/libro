import rdf, {
  NamedNode,
  Quadruple,
  SomeTerm, 
} from '@ontologies/core';
import { SomeNode } from 'link-lib';

export const quadruple = (
  s: SomeNode,
  p: NamedNode,
  o: SomeTerm,
  g: NamedNode = rdf.defaultGraph(),
): Quadruple => [s, p, o, g];
