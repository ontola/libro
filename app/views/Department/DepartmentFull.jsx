import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CardContent, LinkedDetailDate } from '../../components';
import argu from '../../ontology/argu';
import teamGL from '../../ontology/teamGL';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import ContentDetails from '../../topologies/ContentDetails';

const DepartmentFull = ({ partOf }) => (
  <React.Fragment>
    <Container>
      {partOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <CardMain data-test="Thing-thing">
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
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
        </CardContent>
      </CardMain>
    </Container>
    <Container size="large">
      <Property forceRender label={teamGL.subDepartments} />
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

DepartmentFull.propTypes = {
  partOf: PropTypes.bool,
};

export default register(DepartmentFull);
