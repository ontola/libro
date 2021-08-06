import { LinkedPropType } from 'link-redux';
import React from 'react';

import './MenuSection.scss';

export interface MenuSectionLabelProps {
  linkedProp: Exclude<LinkedPropType, any[]>;
  name: React.ReactNode;
}

const MenuSectionLabel = ({ linkedProp, name }: MenuSectionLabelProps): JSX.Element => (
  <div
    className="MenuSectionLabel"
    data-test="MenuSection-MenuSectionLabel"
  >
    <div className="MenuSectionLabel__bar" />
    <div className="MenuSectionLabel__text">
      {name || linkedProp.value}
    </div>
    <div className="MenuSectionLabel__bar" />
  </div>
);

export default MenuSectionLabel;
