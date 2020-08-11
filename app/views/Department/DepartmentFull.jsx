import schema from '@ontologies/schema';
import {
  Property,
  ReturnType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import argu from '../../ontology/argu';
import teamGL from '../../ontology/teamGL';
import ontola from '../../ontology/ontola';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { fullResourceTopology } from '../../topologies/FullResource';

const DepartmentFull = ({ postalRanges, renderPartOf }) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <CardMain data-test="Thing-thing">
        <CardContent endSpacing>
          <HeaderWithMenu
            menu={<Property label={ontola.actionsMenu} />}
          >
            <Property label={schema.name} />
          </HeaderWithMenu>
          <ContentDetails>
            <Property label={teamGL.newVolunteersCount} />
            <Property label={teamGL.volunteersCount} />
            <Property label={teamGL.inactiveVolunteersCount} />
            <Property label={teamGL.activeVolunteersCount} />
            <Property label={teamGL.veryActiveVolunteersCount} />
            <Property label={teamGL.futureEventsCount} />
            <Property label={teamGL.groupsCount} />
            <LinkedDetailDate />
          </ContentDetails>
          <div>
            <span>Postcodes: </span>
            {postalRanges.join(', ')}
          </div>
        </CardContent>
      </CardMain>
    </Container>
    <Container size="large">
      <Property forceRender renderWhenEmpty label={teamGL.subDepartments} />
    </Container>
    <Container>
      <Property forceRender renderWhenEmpty label={teamGL.memberships} />
    </Container>
    <Container>
      <Property forceRender renderWhenEmpty label={teamGL.events} />
    </Container>
    <Container>
      <Property forceRender renderWhenEmpty label={teamGL.groups} />
    </Container>
  </React.Fragment>
);

DepartmentFull.type = teamGL.Department;

DepartmentFull.topology = fullResourceTopology;

DepartmentFull.mapDataToProps = {
  postalRanges: {
    label: teamGL.postalRanges,
    returnType: ReturnType.AllLiterals,
  },
};

DepartmentFull.propTypes = {
  postalRanges: PropTypes.arrayOf(PropTypes.string),
  renderPartOf: PropTypes.bool,
};

export default register(DepartmentFull);
