import React from 'react';
import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Columns,
} from 'components';

class Views extends PropertyBase {
  render() {
    const obs = this.getLinkedObjectPropertyRaw()
      .map(iri => <LinkedObjectContainer object={getValueOrID(iri)} />)
      .toKeyedSeq();
    if (obs && obs.size > 1) {
      return <Columns>{obs}</Columns>;
    } else if (obs) {
      return <div>{obs}</div>;
    }
    return null;
  }
}

LinkedRenderStore.registerRenderer(
  Views,
  'argu:Collection',
  'argu:views'
);
LinkedRenderStore.registerRenderer(
  Views,
  'argu:Collection',
  'argu:views',
  'section'
);

export default Views;
