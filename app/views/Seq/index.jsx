import {
  LinkedResourceContainer,
  register,
  subjectType,
  useDataInvalidation,
  useLinkContext,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';
const filter = /^http:\/\/www\.w3\.org\/1999\/02\/22-rdf-syntax-ns#_[\d]+$/;

function numAsc(a, b) {
  const aP = Number.parseInt(a.predicate.value.slice(base.length), 10);
  const bP = Number.parseInt(b.predicate.value.slice(base.length), 10);
  return aP - bP;
}

export function Seq({ columns, depth, subject }) {
  const context = useLinkContext();
  const sequences = context
    .lrs
    .tryEntity(subject)
    .filter(s => s && s.predicate.value.match(filter) !== null)
    .sort(numAsc)
    .map(s => s.object);

  useDataInvalidation({ dataSubjects: sequences, subject }, context);

  return (
    <React.Fragment>
      {sequences.map((s, i) => (
        <LinkedResourceContainer
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
    </React.Fragment>
  );
}

Seq.propTypes = {
  columns: PropTypes.arrayOf(NamedNode),
  depth: PropTypes.number,
  subject: subjectType,
};
Seq.type = NS.rdf('Seq');
Seq.topology = allTopologies;

export default [
  register(Seq),
];
