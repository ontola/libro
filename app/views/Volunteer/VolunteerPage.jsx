import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
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
          <Property label={schema.isPartOf} />
          <CardMain>
            <CardContent endSpacing>
              <HeaderWithMenu
                menu={(
                  <Property label={NS.ontola('actionsMenu')} />
                )}
              >
                <Property label={[schema.name, rdfs.label]} />
              </HeaderWithMenu>
              <ContentDetails>
                <Property label={NS.teamGL('department')} />
                <Property label={NS.teamGL('engagement')} />
                <Property forceRender label={NS.teamGL('glappUsedAt')} />
              </ContentDetails>
              <div className="Volunteer--contact-options">
                <Property label={NS.teamGL('telephone')} />
                <Property label={NS.teamGL('email')} />
              </div>
              <Property label={schema.text} />
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
