import rdf, { NamedNode } from '@ontologies/core';
import React from 'react';

import teamGL from '../../GroenLinks/ontology/teamGL';
import GroupMembershipContainerGroup from '../../GroenLinks/views/GroupMembership/GroupMembershipContainerGroup';
import GroupMembershipContainerMember from '../../GroenLinks/views/GroupMembership/GroupMembershipContainerMember';

const viewMap = {
  [rdf.id(teamGL.ns('views/user/memberships'))]: GroupMembershipContainerMember[0].component,
  [rdf.id(teamGL.ns('views/volunteer/memberships'))]: GroupMembershipContainerMember[0].component,
  [rdf.id(teamGL.ns('views/department/memberships'))]: GroupMembershipContainerGroup[0].component,
  [rdf.id(teamGL.ns('views/group/memberships'))]: GroupMembershipContainerGroup[0].component,
};

const useViewByIRI = (iri: NamedNode): React.ComponentType<unknown> => viewMap[rdf.id(iri)];

export default useViewByIRI;
