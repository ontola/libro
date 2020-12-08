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
import argu from '../../ontology/argu';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import AttributeList from '../../topologies/AttributeList';
import AttributeListItem from '../../components/AttributeListItem';
import Heading from '../../components/Heading';
import { CardDivider } from '../../topologies/Card';

const DexesInviteFull = ({ assigner, renderPartOf }) => {
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
          <CardContent>
            <Heading>DataDeal - Uitnodiging</Heading>
            <p>
              <strong>{assigner?.value}</strong> wil
              het bestand <strong>{fileName?.value}</strong> met je delen.
            </p>
            <AttributeList>
              <AttributeListItem label={dexes.assigner} propertyLabel="Deler" />
              <AttributeListItem label={dexes.assignee} propertyLabel="Gedeeld met" />
              <Property label={dexes.offer}>
                <AttributeListItem label={dexes.assigner} propertyLabel="Deler" />
                <AttributeListItem label={dexes.assignee} propertyLabel="Gedeeld met" />
                <AttributeListItem label={dexes.file} propertyLabel="Bestand" />
                <Property label={dexes.file}>
                  <AttributeListItem label={schema.encodingFormat} propertyLabel="Formaat" />
                </Property>
              </Property>
            </AttributeList>
          </CardContent>
          <CardDivider />
          <CardContent endSpacing>
            <Heading>Condities</Heading>
            <Property label={dexes.offer}>
              {/* <AttributeListItem label={dexes.prohibitions} propertyLabel="Condities" /> */}
              <Property label={dexes.prohibitions} renderWhenEmpty={false} />
              <Property label={dexes.permissions} renderWhenEmpty={false} />
              <Property label={dexes.obligations} renderWhenEmpty={false} />
            </Property>
            <Property label={ontola.favoriteAction} />
          </CardContent>
        </CardMain>
      </Container>
    </React.Fragment>
  );
};

DexesInviteFull.type = dexes.Invite;

DexesInviteFull.topology = fullResourceTopology;

DexesInviteFull.mapDataToProps = {
  assigner: dexes.assigner,
};

DexesInviteFull.propTypes = {
  assigner: linkType,
  renderPartOf: PropTypes.bool,
};

export default register(DexesInviteFull);
