import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property, register, useProperty, useResourceProperty,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import argu from '../../ontology/argu';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { defaultMenus } from '../common';
import ActionsBar from '../../topologies/ActionsBar';

/** An Offer describes how a certain asset is shared with someone else.
 *  It should be similar to [W3C ODRL Offer](https://www.w3.org/TR/odrl-model/#policy-offer)
 */
const DexesInviteFull = ({ partOf }) => {
  const [offer] = useProperty(dexes.offer);
  const [file] = useResourceProperty(offer, dexes.file);

  return (
    <React.Fragment>
      <Container>
        {partOf && <Property label={schema.isPartOf} />}
        <Property label={argu.trashedAt} />
        <Property label={ontola.publishAction} onLoad={() => null} />
        <CardMain>
          <DetailsBar right={defaultMenus}>
            <Property label={schema.creator} />
            <Property label={rdfx.type} />
            <LinkedDetailDate />
          </DetailsBar>
          <CardContent noSpacing>
            <Property label={schema.email} />
            <Property label={dexes.offer}>
              <p><a href={file?.value}>Download hier</a></p>
              <Property label={dexes.invites} />
              <Property label={dexes.attributionOptions} />
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

DexesInviteFull.propTypes = {
  partOf: PropTypes.bool,
};

export default register(DexesInviteFull);
