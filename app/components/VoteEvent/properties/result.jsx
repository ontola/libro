import React from 'react';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import { DetailStatus } from 'components';

class Result extends PropertyBase {
  render() {
    return (
      <DetailStatus
        status={this.getLinkedObjectProperty()}
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Result,
  'http://schema.org/Thing',
  'http://schema.org/text'
);
