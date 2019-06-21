import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { CardContent } from '../../components';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

class NewVolunteerCardRow extends React.PureComponent {
  static type = [NS.teamGL('Volunteer')];

  static topology = cardRowTopology;

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default register(NewVolunteerCardRow);
