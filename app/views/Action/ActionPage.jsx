import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { pageTopology } from '../../topologies/Page';

import { Action } from './Action';

export class ActionPage extends Action {
  static topology = pageTopology;

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

export default register(ActionPage);
