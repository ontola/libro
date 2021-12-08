import * as schema from '@ontologies/schema';
import {
  Property,
  ReturnType,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../../components/Card/CardContent';
import HeaderWithMenu from '../../../../components/HeaderWithMenu';
import LinkedDetailDate from '../../../../components/LinkedDetailDate';
import argu from '../../../../ontology/argu';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import ContentDetails from '../../../../topologies/ContentDetails';
import { fullResourceTopology } from '../../../../topologies/FullResource';

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
