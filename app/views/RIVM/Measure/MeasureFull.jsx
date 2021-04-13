import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import app from '../../../ontology/app';
import argu from '../../../ontology/argu';
import dbo from '../../../ontology/dbo';
import meeting from '../../../ontology/meeting';
import ontola from '../../../ontology/ontola';
import rivm from '../../../ontology/rivm';
import wdt from '../../../ontology/wdt';
import ActionsBar from '../../../topologies/ActionsBar';
import CardAppendix from '../../../topologies/Card/CardAppendix';
import CardMain from '../../../topologies/Card/CardMain';
import CardRow from '../../../topologies/Card/CardRow';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { defaultMenus } from '../../common';

const MeasureFull = ({ renderPartOf }) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property label={ontola.publishAction} onLoad={() => null} />
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={rdfx.type} />
          <Property label={schema.creator} />
          <LinkedDetailDate />
          <Property label={argu.pinnedAt} />
          <Property label={argu.expiresAt} />
          <Property label={argu.followsCount} />
          <Property label={schema.location} />
          <Property label={argu.grantedGroups} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <Property label={foaf.isPrimaryTopicOf} onLoad={() => null} />
        </CardContent>
        <CardRow>
          <Property label={argu.attachments} onLoad={() => null} />
          <Property label={meeting.attachment} onLoad={() => null} />
        </CardRow>
        <ActionsBar>
          <Property label={ontola.favoriteAction} onLoad={() => null} />
        </ActionsBar>
        <CardAppendix>
          <Property forceRender label={app.omniform} />
        </CardAppendix>
      </CardMain>
    </Container>
    <Container>
      <Property label={schema.comment} />
    </Container>
  </React.Fragment>
);

MeasureFull.type = rivm.Measure;

MeasureFull.topology = fullResourceTopology;

MeasureFull.propTypes = {
  renderPartOf: PropTypes.bool,
};

export default register(MeasureFull);
