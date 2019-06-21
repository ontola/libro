import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { CardContent } from '../../components';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

class VolunteerCard extends React.PureComponent {
  static type = [NS.teamGL('NewVolunteer')];

  static topology = [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
  ];

  render() {
    return (
      <CardRow>
        <CardContent>
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
      </CardRow>
    );
  }
}

export default register(VolunteerCard);
