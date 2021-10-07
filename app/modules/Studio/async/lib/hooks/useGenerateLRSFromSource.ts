import { Node } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import { useDebounce } from 'use-debounce';

import generateLRS from '../../../../../helpers/generateLRS';
import register from '../../../../../views';
import { LibroDocument } from '../../../components/Studio';
import parseToGraph from '../../../lib/parseToGraph';

const EDITOR_UPDATE_FQ = 300;

export const useGenerateLRSFromSource = ({ source }: LibroDocument): [
  LinkReduxLRSType,
  Node[],
  string | undefined,
] => {
  const [bundle, setBundle] = React.useState(() => generateLRS());
  const [resources, setResources] = React.useState<SomeNode[]>(
    () => [bundle.lrs.store.getInternalStore().quads[0].subject],
  );
  const [bufferedText] = useDebounce(source, EDITOR_UPDATE_FQ, { leading: true });

  React.useEffect(() => {
    try {
      const graphs = parseToGraph(bufferedText ?? '');
      const nextResources = graphs.flatMap(([subject]) => subject);
      const data = graphs.flatMap(([_, rdfIndex]) => (rdfIndex as RDFIndex).quads);
      const next = generateLRS(data);
      register(next.lrs);

      setResources(nextResources);
      setBundle(next);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug(e);
    }
  }, [setResources, setBundle, bufferedText]);

  return [bundle.lrs, resources, bufferedText];
};
