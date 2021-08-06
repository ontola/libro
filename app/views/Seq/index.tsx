import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import equal from 'fast-deep-equal';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary';
import { useSeqToArr } from '../../hooks/useSeqToArr';
import { allTopologies } from '../../topologies';

interface SeqProps {
  childProps: Record<string, unknown>;
  depth: number;
  gutter: number;
  itemRenderer: () => JSX.Element;
  itemWrapper: React.ElementType;
  itemWrapperOpts: Record<string, unknown>;
  renderGutter?: (items: SomeTerm[]) => JSX.Element;
  separator: string;
}

export const Seq: FC<SeqProps> = ({
  childProps,
  depth,
  itemRenderer: ItemRenderer,
  itemWrapper: ItemWrapper,
  itemWrapperOpts,
  gutter,
  renderGutter,
  separator,
  subject,
}) => {
  const [sequenceItems] = useSeqToArr(subject);
  const [memoizedProps, setMemoizedProps] = React.useState(childProps);
  React.useEffect(() => {
    if (!equal(childProps, memoizedProps)) {
      setMemoizedProps(childProps);
    }
  }, [childProps]);

  if (gutter === -1) {
    return null;
  }

  const [primary, secondary] = React.useMemo(() => {
    if (sequenceItems.length > gutter) {
      return [sequenceItems.slice(0, gutter), sequenceItems.slice(gutter)];
    }

    return [sequenceItems, null];
  }, [sequenceItems, gutter]);

  const elements = React.useMemo(() => (
    primary.map((s, i) => (
      <ItemWrapper
        key={s.toString()}
        {...itemWrapperOpts}
      >
        <ErrorBoundary data-debug={s.toString()}>
          <Resource
            {...memoizedProps}
            count={sequenceItems.length}
            data-test={`Seq-${i}-${s.value}`}
            depth={depth}
            key={`${subject}-${s}`}
            sequenceIndex={i}
            subject={s}
          >
            {ItemRenderer && <ItemRenderer />}
          </Resource>
        </ErrorBoundary>
      </ItemWrapper>
    ))
  ), [subject, sequenceItems, memoizedProps, depth]);

  const primaryItems = React.useMemo(
    () => (
      separator
        ? elements.reduce<Array<JSX.Element | string>>((prev, curr) => [...prev, separator, curr].flat(), [])
        : elements
    ), [separator, elements],
  );
  const secondaryItems = React.useMemo(() => (
    secondary && renderGutter ? renderGutter(secondary) : null
  ), [secondary, renderGutter]);

  return (
    <React.Fragment>
      {primaryItems}
      {secondaryItems}
    </React.Fragment>
  );
};

Seq.type = rdfx.Seq;

Seq.topology = allTopologies;

Seq.defaultProps = {
  itemWrapper: React.Fragment,
  itemWrapperOpts: {},
};

export default [
  register(Seq),
];
