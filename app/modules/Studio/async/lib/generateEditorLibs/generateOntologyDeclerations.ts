
import { isNamedNode } from '@ontologies/core';

import { validVariableRegex } from './validVariableNameRegex';

export type OntologyMap = Array<[Record<string, unknown>, string]>;

const buildOntologyDeclaration = (ont: Record<string, unknown>, name: string) => {
  const keys = Object.keys(ont);
  const mappedKeys = keys.filter((key) => isNamedNode(ont[key]))
    .map((key) => {
      const isRegularVariableName = validVariableRegex.test(key);
      const rightHand = isRegularVariableName ? key : `['${key}']`;

      return `${rightHand}: NamedNode;`;
    });

  return [
    `declare type ${name.toUpperCase()} = {`,
    'ns: (term: string) => NamedNode,',
    ...mappedKeys,
    '};',
    `declare const ${name}: ${name.toUpperCase()};`,
  ].flat().join('\n');
};

export const generateOntologyDeclerations = (ontologyMap: OntologyMap): string => [
  ...ontologyMap.map((ont) => buildOntologyDeclaration(ont[0], ont[1])),
].flat().join('\n');
