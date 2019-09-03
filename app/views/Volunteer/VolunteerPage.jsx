import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import Container from '../../topologies/Container';
import CardMain from '../../topologies/Card/CardMain';
import { CardContent } from '../../components';
import ContentDetails from '../../topologies/ContentDetails';
import HeaderWithMenu from '../../components/HeaderWithMenu';

class VolunteerPage extends React.PureComponent {
  static type = NS.teamGL('Volunteer');

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <PrimaryResource>
        <Container>
          <Property label={NS.schema('isPartOf')} />
          <CardMain>
            <CardContent noSpacing>
              <HeaderWithMenu
                menu={(
                  <Property label={NS.ontola('actionsMenu')} />
                )}
              >
                <Property label={[NS.schema('name'), NS.rdfs('label')]} />
              </HeaderWithMenu>
              <ContentDetails>
                <Property label={NS.teamGL('department')} />
                <Property label={NS.teamGL('engagement')} />
              </ContentDetails>
              <div className="Volunteer--contact-options">
                <Property label={NS.teamGL('telephone')} />
                <Property label={NS.teamGL('email')} />
              </div>
              <Property label={NS.schema.text} />
            </CardContent>
          </CardMain>
          <Property renderWhenEmpty label={NS.org('hasMembership')} />
          <Property renderWhenEmpty label={NS.teamGL('events')} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(VolunteerPage);
