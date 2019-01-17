import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase,
  withLRS,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { handle } from '../../../helpers/logging';
import { allTopologies } from '../../../topologies';

const DECIMAL = 10;

class ShProperty extends PropertyBase {
  static toCompactList(arr) {
    const s = new Set(arr);
    s.delete(undefined);
    s.delete(null);
    return Array.from(s);
  }

  /**
   * Filters a prop based on the black- and whitelist.
   * @param {SomeNode | undefined} propSubject The subject of the property object
   * @return {SomeNode|undefined} The prop if allowed or undefined
   */
  filterProp(propSubject) {
    const {
      blacklist,
      lrs,
      whitelist,
    } = this.props;

    if (propSubject && (whitelist || blacklist)) {
      const paths = lrs.store.match(propSubject, NS.sh('path'));

      // The filter is on the blanknode id of the propshape, rather than its sh:path value
      const allowed = whitelist
        ? paths.some(s => whitelist.includes(s.object))
        : paths.filter(s => blacklist.includes(s.object));

      return allowed ? propSubject : undefined;
    }

    return propSubject;
  }

  orderProps() {
    const { lrs } = this.props;

    const groups = new Map();
    const props = [];
    const unorderedProps = [];

    const properties = this.getLinkedObjectPropertyRaw();
    for (let i = 0, maxLen = properties.length; i < maxLen; i++) {
      const prop = this.filterProp(properties[i] ? properties[i].object : undefined);
      if (prop) {
        const group = lrs.store.anyStatementMatching(prop, NS.sh('group'));
        if (group && !groups.has(group.object)) {
          groups.set(group.object, []);
        }

        const order = lrs.store.anyStatementMatching(prop, NS.sh('order'));
        if (order) {
          const orderNo = Number.parseInt(order.object.value, DECIMAL);
          if (group) {
            groups.get(group.object)[orderNo] = prop;
          } else {
            props[orderNo] = prop;
          }
        } else {
          unorderedProps.push(prop);
        }
      }
    }

    groups.forEach((v, g) => {
      const group = { group: g, props: v.map(p => this.filterProp(p)).filter(Boolean) };
      if (group.props.length > 0) {
        const order = lrs.store.anyStatementMatching(g, NS.sh('order'));
        if (order) {
          const i = Number.parseInt(order.object.value, DECIMAL);
          props.splice(i, 0, group);
        } else if (group) {
          unorderedProps.push(group);
        }
      }
    });

    return [
      ShProperty.toCompactList(props),
      ShProperty.toCompactList(unorderedProps),
    ];
  }

  renderPropOrGroup(propsOrGroup, focusNode) {
    return propsOrGroup.map((s) => {
      if (Object.prototype.hasOwnProperty.call(s, 'props')) {
        return this.renderGroup(s, focusNode);
      }

      return this.renderProp(s, focusNode);
    });
  }

  renderGroup(s, focusNode) {
    const { theme } = this.props;

    return (
      <LinkedResourceContainer
        key={s.group.value}
        properties={ShProperty
          .toCompactList(s.props)
          .map((p, i) => this.renderProp(p, focusNode, i === 0))
        }
        subject={s.group}
        theme={theme}
      />
    );
  }

  renderProp(s, focusNode, couldAutoFocus = true) {
    const {
      autofocusForm,
      targetNode,
      targetValue,
      theme,
      onKeyUp,
    } = this.props;

    return (
      <LinkedResourceContainer
        autofocus={couldAutoFocus && autofocusForm && s.value === focusNode.value}
        key={s.value}
        subject={s}
        targetNode={targetNode}
        targetValue={targetValue}
        theme={theme}
        onKeyUp={onKeyUp}
      />
    );
  }

  render() {
    const [props, unorderedProps] = this.orderProps();

    if (props.length + unorderedProps.length === 0) {
      handle(new Error(`Rendered SHACL::property for ${this.props.subject} without properties`));
      return null;
    }

    const focusNode = props.length ? props[0] : unorderedProps[0];

    return (
      <React.Fragment>
        <div className="ungrouped">
          {this.renderPropOrGroup(props, focusNode)}
        </div>
        <div className="grouped">
          {this.renderPropOrGroup(unorderedProps, focusNode)}
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
