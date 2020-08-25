import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  useDataFetching,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import argu from '../../ontology/argu';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { defaultMenus } from '../common';

const DexesInviteFull = ({ email, renderPartOf }) => {
  const [offer] = useProperty(dexes.offer);
  const [file] = useResourceProperty(offer, dexes.file);
  useDataFetching([file]);
  const [fileName] = useResourceProperty(file, schema.name);

  return (
    <React.Fragment>
      <Container>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property label={argu.trashedAt} />
        <Property label={ontola.publishAction} onLoad={() => null} />
        <CardMain>
          <DetailsBar right={defaultMenus}>
            <Property label={schema.creator} />
            <Property label={rdfx.type} />
            <LinkedDetailDate />
          </DetailsBar>
          <CardContent endSpacing>
            <p>
              <strong>{email?.value}</strong> wil
              het bestand <strong>{fileName?.value}</strong> met je delen.
            </p>
            <Property label={dexes.offer}>
              <Property label={dexes.prohibitions} renderWhenEmpty={false} />
              <Property label={dexes.permissions} renderWhenEmpty={false} />
              <Property label={dexes.obligations} renderWhenEmpty={false} />
            </Property>
          </CardContent>
          <ActionsBar>
            <Property label={ontola.favoriteAction} />
          </ActionsBar>
        </CardMain>
      </Container>
    </React.Fragment>
  );
};

DexesInviteFull.type = dexes.Invite;

DexesInviteFull.topology = fullResourceTopology;

DexesInviteFull.mapDataToProps = {
  email: schema.email,
};

DexesInviteFull.propTypes = {
  email: linkType,
  renderPartOf: PropTypes.bool,
};

export default register(DexesInviteFull);
