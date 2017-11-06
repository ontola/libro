import {
  linkedPropType,
  LinkedObjectContainer,
  Property,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Dropdown,
  SideBarLink,
} from '../../../../components';
import LinkedRenderStore, { NS } from '../../../../helpers/LinkedRenderStore';

const ViewsDropdown = (props) => {
  const label = <Property label={NS.schema('name')} topology={NS.argu('sidebar')} />;

  return (
    <div style={{ display: 'flex' }}>
      <Dropdown
        contentClassName="Dropdown__organizations_menu__content"
        trigger={<FontAwesome name="caret-square-o-down" />}
      >
        <LinkedObjectContainer object={props.linkedProp} />
      </Dropdown>
      <SideBarLink label={label} />
    </div>
  );
};

ViewsDropdown.propTypes = {
  linkedProp: linkedPropType.isRequired,
};

LinkedRenderStore.registerRenderer(
  ViewsDropdown,
  NS.argu('InfiniteCollection'),
  NS.argu('views'),
  NS.argu('sidebar')
);

export default ViewsDropdown;
