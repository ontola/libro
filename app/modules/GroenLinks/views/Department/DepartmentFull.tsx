import * as schema from '@ontologies/schema';
import {
  Property,
  ReturnType,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../Argu/lib/argu';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import LinkedDetailDate from '../../../Common/components/LinkedDetailDate';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import ontola from '../../../Core/ontology/ontola';
import teamGL from '../../ontology/teamGL';

const DepartmentFull = () => {
  const postalRanges = useProperty(teamGL.postalRanges, { returnType: ReturnType.AllLiterals });

  return (
    <Container>
      <Property label={argu.trashedAt} />
      <CardMain data-test="Thing-thing">
        <CardContent endSpacing>
          <HeaderWithMenu
            menu={<Property label={ontola.actionsMenu} />}
          >
            <Property label={schema.name} />
          </HeaderWithMenu>
          <ContentDetails>
            <Property label={teamGL.totalNewVolunteersCount} />
            <Property label={teamGL.totalVolunteersCount} />
            <Property label={teamGL.inactiveVolunteersRatio} />
            <Property label={teamGL.activeVolunteersRatio} />
            <Property label={teamGL.veryActiveVolunteersRatio} />
            <Property label={teamGL.totalFutureEventsCount} />
            <Property label={teamGL.totalGroupsCount} />
            <LinkedDetailDate />
          </ContentDetails>
          <div>
            <span>
              Postcodes:
              {' '}
            </span>
            {postalRanges.join(', ')}
          </div>
        </CardContent>
      </CardMain>
      <Property label={ontola.tabsMenu} />
    </Container>
  );
};

DepartmentFull.type = teamGL.Department;

DepartmentFull.topology = fullResourceTopology;

export default register(DepartmentFull);
