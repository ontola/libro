import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  lowLevel,
  subjectType,
  LinkedResourceContainer,
  Property,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Dropdown,
  SideBarLink,
} from '../../../../components';
import { NS } from '../../../../helpers/LinkedRenderStore';

const ViewsDropdown = (props) => {
  const label = <Property label={NS.schema('name')} topology={NS.argu('sidebar')} />;

  return (
    <div style={{ display: 'flex' }}>
      <Dropdown
        contentClassName="Dropdown__organizations_menu__content"
        trigger={<FontAwesome name="caret-square-o-down" />}
      >
        <LinkedResourceContainer subject={props.linkedProp} />
      </Dropdown>
      <SideBarLink label={label} to={props.subject} />
    </div>
  );
};

ViewsDropdown.propTypes = {
  linkedProp: linkedPropType.isRequired,
  subject: subjectType.isRequired,
};

export default LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(ViewsDropdown),
  NS.argu('InfiniteCollection'),
  NS.argu('views'),
  NS.argu('sidebar')
);
