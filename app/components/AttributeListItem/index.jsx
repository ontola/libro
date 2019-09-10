import {
  LinkedResourceContainer,
  Property,
  linkType,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const AttributeListItem = ({ label, propertyLabel }) => {
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
            : <LinkedResourceContainer subject={label} />
        }
      </td>
      <td><Property label={label} limit={Infinity} /></td>
    </tr>
  );
};

AttributeListItem.propTypes = {
  label: linkType,
  propertyLabel: PropTypes.string,
};

export default AttributeListItem;
