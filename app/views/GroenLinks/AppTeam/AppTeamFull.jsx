import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import HeaderWithMenu from '../../../components/HeaderWithMenu';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import org from '../../../ontology/org';
import teamGL from '../../../ontology/teamGL';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const AppTeamFull = ({ renderPartOf, status }) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
    <CardMain>
      <CardContent endSpacing>
        <HeaderWithMenu
          menu={(
            <Property label={ontola.actionsMenu} />
          )}
        >
          <Property label={[schema.name, rdfs.label]} />
        </HeaderWithMenu>
        <Property label={schema.text} />
      </CardContent>
      {status === app.ns('enums/app_teams/status#pending') && <Property label={ontola.startedAction} />}
    </CardMain>
    <Property label={teamGL.leader} />
    <Property renderWhenEmpty label={org.hasMembership} />
  </Container>
);

AppTeamFull.type = teamGL.AppTeam;

AppTeamFull.topology = fullResourceTopology;

AppTeamFull.mapDataToProps = {
  status: teamGL.status,
};

AppTeamFull.propTypes = {
  renderPartOf: PropTypes.bool,
  status: linkType,
};

export default register(AppTeamFull);
