import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase, withLRS,
} from 'link-redux';
import { BlankNode } from 'rdflib';
import React from 'react';

import { allow, filter, sortIRIS } from '../../../helpers/data';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const DECIMAL = 10;

class ShProperty extends PropertyBase {
  static toCompactList(arr) {
    const s = new Set(arr);
    s.delete(undefined);
    s.delete(null);
    return Array.from(s);
  }

  renderPropOrGroup(propOrGroup) {
    const {
      blacklist,
      onKeyUp,
      targetNode,
      theme,
      whitelist,
    } = this.props;
    // The props in order
    let props = ShProperty.toCompactList(propOrGroup);

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
        // The filter is on the blanknode id of the propshape, rather than it's sh:path value
        matches = allow(paths.map(s => s.object), whitelist);
      } else if (blacklist) {
        // The filter is on the blanknode id of the propshape, rather than it's sh:path value
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
              .map(p => (
                <LinkedResourceContainer
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
    const gutter = [];

    this
      .getLinkedObjectPropertyRaw()
      .forEach((s) => {
        const group = lrs.store.anyStatementMatching(s.object, NS.sh('group'));
        if (group && !groups.has(group.object.value)) {
          groups.set(group.object.value, []);
        }

        const order = lrs.store.anyStatementMatching(s.object, NS.sh('order'));
        if (order) {
          const i = Number.parseInt(order.object.value, DECIMAL);
          if (group) {
            groups.get(group.object.value)[i] = s.object;
          } else {
            props[i] = s.object;
          }
        } else if (s && s.object) {
          gutter.push(s.object);
        }
      });

    groups.forEach((v, k) => {
      const g = new BlankNode(k);
      const group = { group: g, props: v.filter(p => p !== undefined) };
      const order = lrs.store.anyStatementMatching(g, NS.sh('order'));
      if (order) {
        const i = Number.parseInt(order.object.value, DECIMAL);
        props.splice(i, 0, group);
      } else if (group) {
        gutter.push(group);
      }
    });

    if (props.length === 0) {
      // TODO: bugsnag
      return null;
    }

    return (
      <React.Fragment>
        <div className="grouped">
          {this.renderPropOrGroup(props)}
        </div>
        <div className="gutter">
          {this.renderPropOrGroup(gutter)}
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
