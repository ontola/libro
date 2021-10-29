import { Node } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React from 'react';
import { useDebounce } from 'use-debounce';

import { handle } from '../../../../../helpers/logging';
import { LibroDocument } from '../../../components/Studio';
import parseToGraph from '../../../lib/parseToGraph';

const EDITOR_UPDATE_FQ = 300;
const EMPTY_GRAPH: Node[] = [];

const calculate = (source: string): Node[] => {
  try {
    const graphs = parseToGraph(source);

    return graphs.flatMap(([subject]) => subject);
  } catch (e) {
    handle(e);

    return EMPTY_GRAPH;
  }
};

export const useResourcesFromSource = ({ source }: LibroDocument): Node[] => {
  const [resources, setResources] = React.useState<SomeNode[]>(() => calculate(source));
  const [bufferedText] = useDebounce(source, EDITOR_UPDATE_FQ, { leading: true });

  React.useEffect(() => {
    const generateNextLRS = async () => {
      try {
        setResources(calculate(bufferedText ?? ''));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.debug(e);
      }
    };

    generateNextLRS();
  }, [setResources, bufferedText]);

  return resources;
};
