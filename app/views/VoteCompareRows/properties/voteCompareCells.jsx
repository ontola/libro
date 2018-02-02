import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

class VoteCompareCells extends PropertyBase {
  render() {
    const cells = this
      .getLinkedObjectPropertyRaw()
      .map(link => <LinkedObjectContainer key={`vote-comp-cell-${getValueOrID(link)}`} object={link.object} />);

    return (
      <div>
        {cells}
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteCompareCells,
  NS.argu('CompareRow'),
  NS.argu('compareCells')
);
