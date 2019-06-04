import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import { CardContent } from '../../components';
import DetailsBar from '../../topologies/DetailsBar';
import Card from '../../topologies/Card';
import ActionsBar from '../../topologies/ActionsBar';

class NewVolunteerContainer extends React.PureComponent {
  static type = [NS.teamGL('NewVolunteer')];

  static topology = [
    containerTopology,
  ];

  render() {
    return (
      <Card>
        <DetailsBar>
          <Property label={NS.schema('dateCreated')} />
          <Property label={NS.teamGL('department')} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[NS.schema('name'), NS.rdfs('label')]} />
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
