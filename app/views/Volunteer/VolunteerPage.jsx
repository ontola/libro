import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import teamGL from '../../ontology/teamGL';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import Container from '../../topologies/Container';
import CardMain from '../../topologies/Card/CardMain';
import { CardContent } from '../../components';
import ContentDetails from '../../topologies/ContentDetails';
import HeaderWithMenu from '../../components/HeaderWithMenu';

class VolunteerPage extends React.PureComponent {
  static type = teamGL.Volunteer;

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <PrimaryResource>
        <Container>
          <Property label={schema.isPartOf} />
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
      </PrimaryResource>
    );
  }
}

export default register(VolunteerPage);
