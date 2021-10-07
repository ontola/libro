import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../../components/Card/CardContent';
import HeaderWithMenu from '../../../../components/HeaderWithMenu';
import ontola from '../../../../ontology/ontola';
import org from '../../../../ontology/org';
import teamGL from '../../../../ontology/teamGL';
import Container from '../../../../topologies/Container';
import CardMain from '../../../../topologies/Card/CardMain';
import ContentDetails from '../../../../topologies/ContentDetails';
import { fullResourceTopology } from '../../../../topologies/FullResource';

interface VolunteerFullProps {
  renderPartOf: boolean;
}

const VolunteerFull = ({ renderPartOf }: VolunteerFullProps) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
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
          <Property
            forceRender
            label={teamGL.glappUsedAt}
          />
        </ContentDetails>
        <div className="Volunteer--contact-options">
          <Property label={teamGL.telephone} />
          <Property label={schema.email} />
        </div>
        <Property label={schema.text} />
      </CardContent>
    </CardMain>
    <Property
      renderWhenEmpty
      label={org.hasMembership}
    />
    <Property
      renderWhenEmpty
      label={teamGL.events}
    />
    <Property label={teamGL.user}>
      <Property
        renderWhenEmpty
        label={teamGL.departmentMemberships}
      />
    </Property>
  </Container>
);

VolunteerFull.type = teamGL.Volunteer;

VolunteerFull.topology = fullResourceTopology;

export default register(VolunteerFull);