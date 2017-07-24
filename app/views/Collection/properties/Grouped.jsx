import { Map } from 'immutable';
import {
  LinkedObjectContainer,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import {
  Columns,
} from 'components';

class Grouped extends PropertyBase {
  render() {
    const { groupBy } = this.props;
    const grouped = new Map();
    let objs = this.getLinkedObjectPropertyRaw();
    if (!(objs instanceof Array)) {
      objs = [objs];
    }
    objs.forEach((o) => {
      const val = o[groupBy] && o[groupBy][0]['@value'];
      if (typeof grouped[val] === 'undefined') {
        grouped[val] = [];
      }
      grouped[val].push(o);
    });
    const groups = Object.keys(grouped).filter(g => g !== '_c');
    return (
      <Columns>
        {groups.map(group => (
          <div key={`groupedmember${group}`}>
            {grouped[group].map(mem => (
              <LinkedObjectContainer
                key={`groupedmember${mem['@id']}`}
                object={mem['@id']}
                topology="argu:collection"
              />
            ))}
          </div>
        ))}
      </Columns>
    );
  }
}

export default Grouped;
