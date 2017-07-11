import React from 'react';
import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Columns,
} from 'components';

class Views extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectPropertyRaw();
    if (typeof prop === 'string') {
      return <LinkedObjectContainer object={prop} />;
    }
    const obs = prop.map(iri => <LinkedObjectContainer object={getValueOrID(iri)} />);
    if (obs && obs.length > 1) {
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
