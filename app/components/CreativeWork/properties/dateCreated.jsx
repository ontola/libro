import React from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import { PropertyBase } from 'link-redux';
import {
  DetailDate,
} from 'components';

class DateCreated extends PropertyBase {
  render() {
    return (
      <DetailDate
        createdAt={this.getLinkedObjectProperty()}
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  DateCreated,
  'http://schema.org/CreativeWork',
  'http://schema.org/dateCreated'
);

export default DateCreated;
