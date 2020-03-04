import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../topologies/Container';
import Card from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';
import ActionsBar from '../../topologies/ActionsBar';

class NewVolunteerContainer extends React.PureComponent {
  static type = [teamGL.NewVolunteer];

  static topology = [
    containerTopology,
  ];

  render() {
    return (
      <Card>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <ContentDetails>
            <Property label={teamGL.department} />
            <Property label={schema.dateCreated} />
          </ContentDetails>
          <div className="Volunteer--contact-options">
            <Property label={teamGL.telephone} />
            <Property label={teamGL.email} />
          </div>
        </CardContent>
        <ActionsBar>
          <Property label={ontola.favoriteAction} />
        </ActionsBar>
      </Card>
    );
  }
}

export default register(NewVolunteerContainer);
