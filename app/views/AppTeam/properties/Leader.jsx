import CardContent from '@material-ui/core/CardContent';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import Heading from '../../../components/Heading';
import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';
import Card from '../../../topologies/Card';
import ContentDetails from '../../../topologies/ContentDetails';

const Leader = ({ linkedProp }) => (
  <React.Fragment>
    <Heading>Aanvoerder</Heading>
    <Card>
      <CardContent>
        <Resource subject={linkedProp}>
          <Heading>
            <Property label={schema.givenName} />
            <Property label={teamGL.lastName} />
          </Heading>
          <ContentDetails>
            <div className="Volunteer--contact-options">
              <Property label={teamGL.telephone} />
              <Property label={schema.email} />
            </div>
          </ContentDetails>
        </Resource>
      </CardContent>
    </Card>
  </React.Fragment>
);

Leader.type = teamGL.AppTeam;

Leader.topology = allTopologies;

Leader.property = teamGL.leader;

Leader.propTypes = {
  linkedProp: linkedPropType,
};

export default register(Leader);
