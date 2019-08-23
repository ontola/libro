import {
  LinkedResourceContainer,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { seqToArr } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

export function Seq({
  childProps,
  columns,
  depth,
  itemWrapper: ItemWrapper,
  gutter,
  renderGutter,
  separator,
  subject,
}) {
  const lrs = useLRS();

  if (gutter === -1) {
    return null;
  }

  const sequences = seqToArr(lrs, [], subject);

  let primary = sequences;
  let secondary;
  if (sequences.length > gutter) {
    primary = sequences.slice(0, gutter);
    secondary = sequences.slice(gutter);
  }

  useDataInvalidation({
    dataSubjects: sequences,
    subject,
  });

  const elements = primary.map((s, i) => (
    <ItemWrapper key={s.toString()}>
      <LinkedResourceContainer
        {...childProps}
        columns={columns}
        count={sequences.length}
        data-test={`Seq-${i}-${s.value}`}
        depth={depth}
        first={sequences[0].object}
        key={`${subject}-${s}`}
        last={sequences[sequences.length - 1].object}
        subject={s}
      />
    </ItemWrapper>
  ));

  return (
    <React.Fragment>
      {separator ? elements.reduce((prev, curr) => [prev, separator, curr]) : elements}
      {secondary && renderGutter && renderGutter(secondary)}
    </React.Fragment>
  );
}

Seq.type = NS.rdf('Seq');

Seq.topology = allTopologies;

Seq.defaultProps = {
  itemWrapper: React.Fragment,
};

Seq.propTypes = {
  childProps: PropTypes.objectOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.instanceOf(NamedNode)),
  depth: PropTypes.number,
  gutter: PropTypes.number,
  itemWrapper: PropTypes.elementType,
  renderGutter: PropTypes.func,
  separator: PropTypes.string,
  subject: subjectType,
};

export default [
  register(Seq),
];
