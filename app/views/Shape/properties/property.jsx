import rdf from '@ontologies/core';
import sh from '@ontologies/shacl';
import { normalizeType } from 'link-lib';
import {
  Resource,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import { allTopologies } from '../../../topologies';

const DECIMAL = 10;

function toCompactList(arr) {
  const s = new Set(arr);
  s.delete(undefined);
  s.delete(null);

  return Array.from(s);
}

/**
 * Filters a prop based on the black- and whitelist.
 * @param {Node | undefined} propSubject The subject of the property object
 * @return {Node|undefined} The prop if allowed or undefined
 */
const filterProp = (props, lrs, propSubject) => {
  const {
    blacklist,
    whitelist,
  } = props;

  if (propSubject && (whitelist || blacklist)) {
    const paths = lrs.store.match(propSubject, sh.path, null, null);

    // The filter is on the blanknode id of the propshape, rather than its sh:path value
    const allowed = whitelist
      ? paths.some(s => whitelist.includes(rdf.id(s.object)))
      : paths.filter(s => blacklist.includes(rdf.id(s.object)));

    return allowed ? propSubject : undefined;
  }

  return propSubject;
};

function orderProps(givenProps, lrs) {
  const groups = new Map();
  const props = [];
  const unorderedProps = [];

  const properties = normalizeType(givenProps.label)
    .flatMap(label => lrs.getResourcePropertyRaw(givenProps.subject, label));

  for (let i = 0, maxLen = properties.length; i < maxLen; i++) {
    const prop = filterProp(givenProps, lrs, properties[i] ? properties[i].object : undefined);
    if (prop) {
      const group = lrs.store.find(prop, sh.group, null, null);
      if (group && !groups.has(group.object)) {
        groups.set(group.object, []);
      }

      const order = lrs.store.find(prop, sh.order, null, null);
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
    const group = {
      group: g,
      props: v.map(p => filterProp(givenProps, lrs, p)).filter(Boolean),
    };
    if (group.props.length > 0) {
      const order = lrs.store.find(g, sh.order, null, null);
      if (order) {
        const orderNo = Number.parseInt(order.object.value, DECIMAL);
        props[orderNo] = group;
      } else if (group) {
        unorderedProps.push(group);
      }
    }
  });

  return [
    toCompactList(props),
    toCompactList(unorderedProps),
  ];
}

const renderProp = (args, _) => (s, focusNode, couldAutoFocus = true) => {
  const {
    autofocusForm,
    propertyIndex,
    targetNode,
    targetValue,
    theme,
    onKeyUp,
  } = args;

  return (
    <Resource
      autofocus={couldAutoFocus && autofocusForm && s.value === focusNode.value}
      key={s.value}
      propertyIndex={propertyIndex}
      subject={s}
      targetNode={targetNode}
      targetValue={targetValue}
      theme={theme}
      onKeyUp={onKeyUp}
    />
  );
};

const renderGroup = (args, s, focusNode) => {
  const {
    propertyIndex,
    theme,
  } = args;

  return (
    <Resource
      focusNode={focusNode}
      key={s.group.value}
      properties={toCompactList(s.props)}
      propertyIndex={propertyIndex}
      renderProp={renderProp(args)}
      subject={s.group}
      theme={theme}
    />
  );
};

const renderPropOrGroup = (props, propsOrGroup, focusNode) => propsOrGroup.map((s) => {
  if (Object.prototype.hasOwnProperty.call(s, 'props')) {
    return renderGroup(props, s, focusNode);
  }

  return renderProp(props)(s, focusNode);
});

const ShProperty = (props) => {
  const lrs = useLRS();
  const [orderedProps, unorderedProps] = orderProps(props, lrs);

  if (orderedProps.length + unorderedProps.length === 0) {
    handle(new Error(`Rendered SHACL::property for ${props.subject} without properties`));

    return null;
  }

  const focusNode = orderedProps.length ? orderedProps[0] : unorderedProps[0];

  return (
    <div style={{ flexGrow: '1' }}>
      <div className="ungrouped">
        {renderPropOrGroup(props, orderedProps, focusNode)}
      </div>
      <div className="grouped">
        {renderPropOrGroup(props, unorderedProps, focusNode)}
      </div>
    </div>
  );
};

ShProperty.type = sh.NodeShape;

ShProperty.property = sh.property;

ShProperty.topology = allTopologies;

ShProperty.propTypes = {
  subject: subjectType,
};

export default register(ShProperty);
