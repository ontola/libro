import { isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {useDataInvalidation, useResourceLinks} from 'link-redux';
import React from 'react';

const isNotNull = (x: unknown): x is [string, SomeNode] => x !== null;

export const useFieldHashes = (fields: SomeNode[]): Map<string, SomeNode> => {
  const timestamp = useDataInvalidation(fields);
  const fieldPaths = useResourceLinks(
    fields,
    { path: sh.path },
  );

  const hashes = React.useMemo(() => {
    const map = fields
      .filter(isNode)
      .map((field, index) => {
        const path = fieldPaths[index].path;

        if (isNode(path)) {
          return [btoa(path.value), field];
        }

        return null;
      })
      .filter(isNotNull);

    return new Map<string, SomeNode>(map);
  }, [timestamp, fieldPaths.length]);

  return hashes;
};
