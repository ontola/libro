import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

class VoteCompareCells extends PropertyBase {
  render() {
    const cells = this
      .getLinkedObjectPropertyRaw()
      .map(link => <LinkedObjectContainer key={`vote-comp-cell-${link}`} object={getValueOrID(link)} />);

    return (
      <div>
        {cells}
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(VoteCompareCells, 'argu:CompareRow', 'argu:compareCells');
