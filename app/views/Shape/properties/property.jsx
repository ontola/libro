import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase, withLRS,
} from 'link-redux';
import React from 'react';

import { allow, filter, sortIRIS } from '../../../helpers/data';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const DECIMAL = 10;

class ShProperty extends PropertyBase {
  static toCompactList(arr) {
    const s = new Set(arr);
    s.delete(undefined);
    s.delete(null);
    return Array.from(s);
  }

  renderPropOrGroup(propsOrGroup, focusNode) {
    const {
      blacklist,
      onKeyUp,
      autofocusForm,
      targetNode,
      theme,
      whitelist,
    } = this.props;
    let props = propsOrGroup;

    if (whitelist || blacklist) {
      const paths = this
        .props
        .lrs
        .store
        .match(null, NS.sh('path'))
        .filter(s => props.find((p) => {
          if (p.props) {
            return p.props.find(gP => gP.sameTerm(s.subject));
          }

          return p.sameTerm(s.subject);
        }))
        .sort(sortIRIS(props, 'subject'));

      let matches;
      if (whitelist) {
        // The filter is on the blanknode id of the propshape, rather than its sh:path value
        matches = allow(paths.map(s => s.object), whitelist);
      } else if (blacklist) {
        // The filter is on the blanknode id of the propshape, rather than its sh:path value
        matches = filter(paths.map(s => s.object), blacklist);
      }

      props = paths.filter(p => matches.includes(p.object)).map(s => s.subject);
    }

    return props.map((s) => {
      if (Object.prototype.hasOwnProperty.call(s, 'props')) {
        return (
          <LinkedResourceContainer
            key={s.group.value}
            properties={ShProperty
              .toCompactList(s.props)
              .map((p, i) => (
                <LinkedResourceContainer
                  autofocus={i === 0 && autofocusForm && s.value === focusNode.value}
                  key={p.value}
                  subject={p}
                  targetNode={targetNode}
                  theme={theme}
                  onKeyUp={onKeyUp}
                />
              ))}
            subject={s.group}
            theme={theme}
          />
        );
      }

      return (
        <LinkedResourceContainer
          autofocus={autofocusForm && s.value === focusNode.value}
          key={s.value}
          subject={s}
          targetNode={targetNode}
          theme={theme}
          onKeyUp={onKeyUp}
        />
      );
    });
  }

  render() {
    const { lrs } = this.props;

    const groups = new Map();
    const props = [];
    const unorderedProps = [];

    this
      .getLinkedObjectPropertyRaw()
      .forEach((s) => {
        const group = lrs.store.anyStatementMatching(s.object, NS.sh('group'));
        if (group && !groups.has(group.object)) {
          groups.set(group.object, []);
        }

        const order = lrs.store.anyStatementMatching(s.object, NS.sh('order'));
        if (order) {
          const i = Number.parseInt(order.object.value, DECIMAL);
          if (group) {
            groups.get(group.object)[i] = s.object;
          } else {
            props[i] = s.object;
          }
        } else if (s && s.object) {
          unorderedProps.push(s.object);
        }
      });

    groups.forEach((v, g) => {
      const group = { group: g, props: v.filter(p => p !== undefined) };
      const order = lrs.store.anyStatementMatching(g, NS.sh('order'));
      if (order) {
        const i = Number.parseInt(order.object.value, DECIMAL);
        props.splice(i, 0, group);
      } else if (group) {
        unorderedProps.push(group);
      }
    });

    if (props.length + unorderedProps.length === 0) {
      // TODO: bugsnag
      return null;
    }

    const propsCompact = ShProperty.toCompactList(props);
    const unorderedPropsCompact = ShProperty.toCompactList(unorderedProps);

    const focusNode = propsCompact.length ? propsCompact[0] : unorderedPropsCompact[0];

    return (
      <React.Fragment>
        <div className="ungrouped">
          {this.renderPropOrGroup(propsCompact, focusNode)}
        </div>
        <div className="grouped">
          {this.renderPropOrGroup(unorderedPropsCompact, focusNode)}
        </div>
      </React.Fragment>
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  withLRS(ShProperty),
  NS.sh('NodeShape'),
  NS.sh('property'),
  allTopologies
);
