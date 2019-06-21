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

class VolunteerPage extends React.PureComponent {
  static type = [NS.teamGL('Volunteer')];

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
              <Property label={[NS.schema('name'), NS.rdfs('label')]} />
              <ContentDetails>
                <Property label={NS.teamGL('department')} />
                <Property label={NS.schema('dateCreated')} />
              </ContentDetails>
              <div className="Volunteer--contact-options">
                <Property label={NS.teamGL('telephone')} />
                <Property label={NS.teamGL('email')} />
              </div>
            </CardContent>
          </CardMain>
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(VolunteerPage);
