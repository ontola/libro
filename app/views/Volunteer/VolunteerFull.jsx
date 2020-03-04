import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import teamGL from '../../ontology/teamGL';
import { fullResourceTopology } from '../../topologies/FullResource';
import Container from '../../topologies/Container';
import CardMain from '../../topologies/Card/CardMain';
import ContentDetails from '../../topologies/ContentDetails';
import HeaderWithMenu from '../../components/HeaderWithMenu';

const VolunteerFull = ({ partOf }) => (
  <Container>
    {partOf && <Property label={schema.isPartOf} />}
    <CardMain>
      <CardContent endSpacing>
        <HeaderWithMenu
          menu={(
            <Property label={ontola.actionsMenu} />
          )}
        >
          <Property label={[schema.name, rdfs.label]} />
        </HeaderWithMenu>
        <ContentDetails>
          <Property label={teamGL.department} />
          <Property label={teamGL.engagement} />
          <Property forceRender label={teamGL.glappUsedAt} />
        </ContentDetails>
        <div className="Volunteer--contact-options">
          <Property label={teamGL.telephone} />
          <Property label={teamGL.email} />
        </div>
        <Property label={schema.text} />
      </CardContent>
    </CardMain>
    <Property renderWhenEmpty label={org.hasMembership} />
    <Property renderWhenEmpty label={teamGL.events} />
  </Container>
);

VolunteerFull.type = teamGL.Volunteer;

VolunteerFull.topology = fullResourceTopology;

VolunteerFull.propTypes = {
  partOf: PropTypes.bool,
};

export default register(VolunteerFull);
