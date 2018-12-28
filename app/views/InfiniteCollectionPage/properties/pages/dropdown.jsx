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
  HeaderLink,
} from '../../../../components';
import { NS } from '../../../../helpers/LinkedRenderStore';
import { headerTopology } from '../../../../topologies/Header';

const PagesDropdown = (props) => {
  const label = <Property label={NS.schema('name')} topology={headerTopology} />;

  return (
    <div style={{ display: 'flex' }}>
      <Dropdown
        contentClassName="Dropdown__organizations_menu__content"
        trigger={<FontAwesome name="caret-square-o-down" />}
      >
        <LinkedResourceContainer subject={props.linkedProp} />
      </Dropdown>
      <HeaderLink label={label} to={props.subject} />
    </div>
  );
};

PagesDropdown.propTypes = {
  linkedProp: linkedPropType.isRequired,
  subject: subjectType.isRequired,
};

export default LinkedRenderStore.registerRenderer(
  withLinkCtx(PagesDropdown),
  NS.argu('InfiniteCollection'),
  NS.as('pages'),
  headerTopology
);
