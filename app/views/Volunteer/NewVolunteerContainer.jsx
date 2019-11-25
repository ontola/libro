import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import { CardContent } from '../../components';
import Card from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';
import ActionsBar from '../../topologies/ActionsBar';

class NewVolunteerContainer extends React.PureComponent {
  static type = [NS.teamGL('NewVolunteer')];

  static topology = [
    containerTopology,
  ];

  render() {
    return (
      <Card>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <ContentDetails>
            <Property label={NS.teamGL('department')} />
            <Property label={schema.dateCreated} />
          </ContentDetails>
          <div className="Volunteer--contact-options">
            <Property label={NS.teamGL('telephone')} />
            <Property label={NS.teamGL('email')} />
          </div>
        </CardContent>
        <ActionsBar>
          <Property label={NS.ontola('favoriteAction')} />
        </ActionsBar>
      </Card>
    );
  }
}

export default register(NewVolunteerContainer);
