import {
  LinkedResourceContainer,
  PropertyBase,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const DECIMAL = 10;

class Agenda extends PropertyBase {
  static type = NS.meeting('Meeting');

  static property = NS.meeting('agenda');

  static topology = allTopologies;

  static toCompactList(arr) {
    const s = new Set(arr);
    s.delete(undefined);
    s.delete(null);
    return Array.from(s);
  }

  render() {
    const { lrs } = this.props;

    const ordered = [];
    const unordered = [];

    this
      .getLinkedObjectPropertyRaw()
      .forEach((s) => {
        const order = lrs.store.anyStatementMatching(s.object, NS.schema('position'));
        if (order) {
          const i = Number.parseInt(order.object.value, DECIMAL);
          ordered[i] = s.object;
        } else {
          unordered.push(s.object);
        }
      });

    if (ordered.length + unordered.length === 0) {
      // TODO: bugsnag
      return null;
    }

    const orderedCompact = this.constructor.toCompactList(ordered);
    const unorderedCompact = this.constructor.toCompactList(unordered);

    return (
      <React.Fragment>
        <React.Fragment>
          {orderedCompact.map(p => <LinkedResourceContainer subject={p} />)}
        </React.Fragment>
        <React.Fragment>
          {unorderedCompact.map(p => <LinkedResourceContainer subject={p} />)}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default register(Agenda);
