import { Node } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { LinkReduxLRSType } from 'link-redux';
import React, { Dispatch, SetStateAction } from 'react';
import { useDebounce } from 'use-debounce';

import generateLRS from '../../helpers/generateLRS';
import useStoredState from '../../hooks/useStoredState';
import register from '../../views';

import defaultSource from './defaultSource';
import parseToGraph from './parseToGraph';

const EDITOR_UPDATE_FQ = 300;

export const useParsedSource = (): [
  LinkReduxLRSType,
  Node[],
    string | undefined,
  Dispatch<SetStateAction<string | undefined>>,
] => {
  const [bundle, setBundle] = React.useState(() => generateLRS());
  const [resources, setResources] = React.useState<SomeNode[]>(
    () => [bundle.lrs.store.getInternalStore().quads[0].subject],
  );
  const [text, setText] = useStoredState('libro.pagebuilder.value', defaultSource);

  const [bufferedText] = useDebounce(text, EDITOR_UPDATE_FQ, { leading: true });

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
  }, [bufferedText]);

  return [bundle.lrs, resources, bufferedText, setText];
};
