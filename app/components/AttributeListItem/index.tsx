import { NamedNode } from '@ontologies/core';
import {
  Resource,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import React from 'react';

import AllWithProperty from '../../components/AllWithProperty';

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
        {propertyLabel
          ? (
            <label htmlFor={label?.value}>
              {propertyLabel}
            </label>
          )
          : <Resource subject={label} />}
      </th>
      <td>
        <AllWithProperty
          label={label}
          {...otherProps}
        />
      </td>
    </tr>
  );
};

export default AttributeListItem;
