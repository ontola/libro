import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedResourceContainer, PropertyBase } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

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
      .context
      .linkedRenderStore
      .tryEntity(this.props.subject)
      .filter(s => s && s.predicate.value.match(filter))
      .sort(numAsc);
  }

  render() {
    const sequences = this.sequences();
    return (
      sequences.map((s, i) => (
        <LinkedResourceContainer
          count={sequences.length}
          data-test={`Seq-${i}`}
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
  Seq,
  NS.rdf('Seq'),
  RENDER_CLASS_NAME,
  [
    undefined,
    NS.argu('collection'),
    NS.argu('detail'),
    NS.argu('inline'),
    NS.argu('sidebar'),
    NS.argu('sidebarBlock'),
  ]
);
