import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import HeaderWithMenu from '../../../components/HeaderWithMenu';
import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const OnlineCampaignerFull = ({ renderPartOf }) => (
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
        <div className="Volunteer--contact-options">
          <Property label={teamGL.telephone} />
          <Property label={schema.email} />
        </div>
        <Property label={schema.text} />
      </CardContent>
    </CardMain>
  </Container>
);

OnlineCampaignerFull.type = teamGL.OnlineCampaigner;

OnlineCampaignerFull.topology = fullResourceTopology;

OnlineCampaignerFull.propTypes = {
  renderPartOf: PropTypes.bool,
};

export default register(OnlineCampaignerFull);
