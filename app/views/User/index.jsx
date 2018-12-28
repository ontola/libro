import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  subjectType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Resource, SideBarCollapsible } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { headerTopology } from '../../topologies/Header';

import ActorType from './properties/actorType';
import GuestUser from './GuestUser';

const messages = defineMessages({
  actorMenuLabel: {
    defaultMessage: 'Show or hide user menu',
    id: 'https://app.argu.co/i18n/menus/user/collapseLabel',
  },
});

const propTypes = {
  intl: intlShape,
  subject: subjectType,
};

const CurrentActorFooter = () => (
  <Property label={NS.argu('actor')} />
);

const CurrentActorSidebar = ({ intl: { formatMessage }, subject }) => (
  <Resource>
    <SideBarCollapsible
      collapseLabel={formatMessage(messages.actorMenuLabel)}
      id={`${subject}-sidebar-menu`}
      labelComp={<Property label={NS.argu('actor')} />}
    >
      <Property label={NS.argu('actorType')} />
      <LinkedResourceContainer subject={NS.app('apex/menus/user')}>
        <Property label={NS.argu('menuItems')} />
      </LinkedResourceContainer>
    </SideBarCollapsible>
  </Resource>
);

CurrentActorSidebar.propTypes = propTypes;

const RegisteredTypes = [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser')];
const ActorTypes = [...RegisteredTypes, NS.argu('GuestUser')];

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(injectIntl(CurrentActorSidebar)),
    RegisteredTypes,
    RENDER_CLASS_NAME,
    headerTopology
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(CurrentActorFooter),
    ActorTypes,
    RENDER_CLASS_NAME,
    formFooterTopology
  ),
  ActorType,
  GuestUser,
];
