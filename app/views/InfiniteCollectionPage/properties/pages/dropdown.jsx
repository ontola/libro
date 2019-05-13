import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  subjectType,
  LinkedResourceContainer,
  Property,
  withLinkCtx,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Dropdown,
  NavbarLink,
} from '../../../../components';
import { NS } from '../../../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../../../topologies/Navbar';

const PagesDropdown = (props) => {
  const label = <Property label={NS.schema('name')} topology={navbarTopology} />;

  return (
    <div style={{ display: 'flex' }}>
      <Dropdown
        contentClassName="Dropdown__organizations_menu__content"
        trigger={<FontAwesome name="caret-square-o-down" />}
      >
        <LinkedResourceContainer subject={props.linkedProp} />
      </Dropdown>
      <NavbarLink label={label} to={props.subject} />
    </div>
  );
};

PagesDropdown.propTypes = {
  linkedProp: linkedPropType.isRequired,
  subject: subjectType.isRequired,
};

export default LinkedRenderStore.registerRenderer(
  withLinkCtx(PagesDropdown),
  NS.ontola('InfiniteCollection'),
  NS.as('pages'),
  navbarTopology
);
