
import { NodeProperty, NodeType } from './types';

const INDENTATION_SIZE = 2;

export const getBumps = (indentation: number): [short: string, long: string, next: number] => {
  const longIndentation = indentation + INDENTATION_SIZE;
  const shortBump = ''.padStart(indentation, ' ');
  const longBump = ''.padStart(longIndentation, ' ');

  return [shortBump, longBump, longIndentation];
};

export const quote = (value: string): string => {
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/"/g, '\\"');

  return `"${escaped}"`;
};

export const quoteForObjectKey = (prop: NodeProperty): string => {
  switch (prop.type) {
  case NodeType.Shorthand:
    return `[${prop.value}]`;
  case NodeType.LocalPath:
    return `[local(${quote(prop.value)})]`;
  case NodeType.StringValue:
    return quote(prop.value);
  }
};
