import { NamedNode } from '@ontologies/core';
import {
  Property,
  Resource,
  useLinkRenderContext,
  useLRS,
} from 'link-redux';
import React from 'react';

export interface AttributeListItemProps {
  label: NamedNode;
  propertyLabel?: string;
}

const AttributeListItem: React.FC<AttributeListItemProps & any> = ({
  label,
  propertyLabel,
  ...otherProps
}) => {
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();

  if (!lrs.getResourceProperty(subject, label)) {
    return null;
  }

  return (
    <tr>
      <th>
        {
          propertyLabel
            ? <label htmlFor={label?.value}>{propertyLabel}</label>
            : <Resource subject={label} />
        }
      </th>
      <td><Property label={label} limit={Infinity} {...otherProps} /></td>
    </tr>
  );
};

export default AttributeListItem;
