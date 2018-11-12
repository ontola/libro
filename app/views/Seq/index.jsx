import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedResourceContainer, PropertyBase, withLinkCtx } from 'link-redux';
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

export class Seq extends PropertyBase {
  sequences() {
    return this
      .props
      .lrs
      .tryEntity(this.props.subject)
      .filter(s => s && s.predicate.value.match(filter) !== null)
      .sort(numAsc);
  }

  render() {
    const sequences = this.sequences();

    return (
      sequences.map((s, i) => (
        <LinkedResourceContainer
          columns={this.props.columns}
          count={sequences.length}
          data-test={`Seq-${i}-${s.object.value}`}
          first={sequences[0].object}
          key={`${this.props.subject}-${s.object}`}
          last={sequences[sequences.length - 1].object}
          subject={s.object}
        />
      ))
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  withLinkCtx(Seq),
  NS.rdf('Seq'),
  RENDER_CLASS_NAME,
  allTopologies
);
