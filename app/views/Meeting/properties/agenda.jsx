import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  PropertyBase,
  register,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import meeting from '../../../ontology/meeting';
import { allTopologies } from '../../../topologies';

const DECIMAL = 10;

class Agenda extends PropertyBase {
  static type = meeting.Meeting;

  static property = meeting.agenda;

  static topology = allTopologies;

  static toCompactList(arr) {
    const s = new Set(arr);
    s.delete(undefined);
    s.delete(null);

    return Array.from(s);
  }

  render() {
    const { lrs, subject } = this.props;

    const ordered = [];
    const unordered = [];

    this
      .getLinkedObjectPropertyRaw()
      .forEach((s) => {
        const order = lrs.store.anyStatementMatching(s.object, schema.position);
        if (order) {
          const i = Number.parseInt(order.object.value, DECIMAL);
          ordered[i] = s.object;
        } else {
          unordered.push(s.object);
        }
      });

    if (ordered.length + unordered.length === 0) {
      handle(new Error(`Rendered prop agenda for ${subject} without items`));

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

export default [
  register(Agenda),
];
