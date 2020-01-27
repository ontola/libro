import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../topologies/FullResource';

import { Action } from './Action';

export class ActionFull extends Action {
  static topology = fullResourceTopology;

  // False positive due to inheritance
  // eslint-disable-next-line class-methods-use-this
  header() {
    return (
      <Property label={schema.object}>
        <Property label={schema.isPartOf} />
      </Property>
    );
  }
}

export default register(ActionFull);
