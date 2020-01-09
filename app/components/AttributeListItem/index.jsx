import {
  Property,
  Resource,
  linkType,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const AttributeListItem = ({
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
      <td>
        {
          propertyLabel
            ? <label>{propertyLabel}</label>
            : <Resource subject={label} />
        }
      </td>
      <td><Property label={label} limit={Infinity} {...otherProps} /></td>
    </tr>
  );
};

AttributeListItem.propTypes = {
  label: linkType,
  propertyLabel: PropTypes.string,
};

export default AttributeListItem;
