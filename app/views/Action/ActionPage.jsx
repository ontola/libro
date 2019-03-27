import { register, Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';

import { Action } from './Action';

class ActionPage extends Action {
  static topology = pageTopology;

  // False positive due to inheritance
  // eslint-disable-next-line class-methods-use-this
  header() {
    return (
      <Property label={NS.schema('object')}>
        <Property label={NS.schema('isPartOf')} />
      </Property>
    );
  }
}

export default register(ActionPage);
