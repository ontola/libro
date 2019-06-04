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

import { sequenceFilter } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

function numAsc(a, b) {
  const aP = Number.parseInt(a.predicate.value.slice(base.length), 10);
  const bP = Number.parseInt(b.predicate.value.slice(base.length), 10);
  return aP - bP;
}

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

  const sequences = lrs
    .tryEntity(subject)
    .filter(s => s && s.predicate.value.match(sequenceFilter) !== null)
    .sort(numAsc)
    .map(s => s.object);

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
