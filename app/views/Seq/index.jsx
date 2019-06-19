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
  gutter,
  renderGutter,
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

  useDataInvalidation({ dataSubjects: sequences, subject });

  return (
    <React.Fragment>
      {primary.map((s, i) => (
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
      ))}
      {secondary && renderGutter && renderGutter(secondary)}
    </React.Fragment>
  );
}

Seq.propTypes = {
  childProps: PropTypes.objectOf(PropTypes.any),
  columns: PropTypes.arrayOf(NamedNode),
  depth: PropTypes.number,
  gutter: PropTypes.number,
  renderGutter: PropTypes.func,
  subject: subjectType,
};
Seq.type = NS.rdf('Seq');
Seq.topology = allTopologies;

export default [
  register(Seq),
];
