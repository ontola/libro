import RDFTypes from '@rdfdev/prop-types';
import * as rdfx from '@ontologies/rdf';
import equal from 'fast-deep-equal';
import {
  Resource,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary';
import { useSeqToArr } from '../../hooks/useSeqToArr';
import { allTopologies } from '../../topologies';

export const Seq = ({
  childProps,
  columns,
  depth,
  itemRenderer: ItemRenderer,
  itemWrapper: ItemWrapper,
  itemWrapperOpts,
  gutter,
  renderGutter,
  separator,
  subject,
}) => {
  const sequences = useSeqToArr(subject);
  const [memoizedProps, setMemoizedProps] = React.useState(childProps);
  React.useEffect(() => {
    if (!equal(childProps, memoizedProps)) {
      setMemoizedProps(childProps);
    }
  });

  if (gutter === -1) {
    return null;
  }

  const [primary, secondary] = React.useMemo(() => {
    if (sequences.length > gutter) {
      return [sequences.slice(0, gutter), sequences.slice(gutter)];
    }

    return [sequences, null];
  }, [sequences, gutter]);

  const elements = React.useMemo(() => (
    primary.map((s, i) => (
      <ItemWrapper key={s.toString()} {...itemWrapperOpts}>
        <ErrorBoundary data-debug={s.toString()}>
          <Resource
            {...memoizedProps}
            columns={columns}
            count={sequences.length}
            data-test={`Seq-${i}-${s.value}`}
            depth={depth}
            first={sequences[0].object}
            key={`${subject}-${s}`}
            last={sequences[sequences.length - 1].object}
            sequenceIndex={i}
            subject={s}
          >
            {ItemRenderer && <ItemRenderer />}
          </Resource>
        </ErrorBoundary>
      </ItemWrapper>
    ))
  ), [subject, sequences, memoizedProps, columns, depth]);

  const primaryItems = React.useMemo(
    () => (
      separator
        ? elements.reduce((prev, curr) => [prev, separator, curr])
        : elements
    ), [separator, elements]
  );
  const secondaryItems = React.useMemo(() => (
    secondary && renderGutter && renderGutter(secondary)
  ), [secondary, renderGutter]);

  return (
    <React.Fragment>
      {primaryItems}
      {secondaryItems}
    </React.Fragment>
  );
}

Seq.type = rdfx.Seq;

Seq.topology = allTopologies;

Seq.defaultProps = {
  itemWrapper: React.Fragment,
  itemWrapperOpts: {},
};

Seq.propTypes = {
  childProps: PropTypes.objectOf(PropTypes.any),
  columns: PropTypes.arrayOf(RDFTypes.namedNode),
  depth: PropTypes.number,
  gutter: PropTypes.number,
  itemRenderer: PropTypes.elementType,
  itemWrapper: PropTypes.elementType,
  itemWrapperOpts: PropTypes.objectOf(PropTypes.any),
  renderGutter: PropTypes.func,
  separator: PropTypes.string,
  subject: subjectType,
};

export default [
  register(Seq),
];
