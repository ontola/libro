import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../components/AttributeListItem';
import CardContent from '../../components/Card/CardContent';
import CardDivider from '../../components/Card/CardDivider';
import Heading from '../../components/Heading';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import ActionsBar from '../../topologies/ActionsBar';
import AttributeList from '../../topologies/AttributeList';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { defaultMenus } from '../common';

interface InterventionFullProps {
  renderPartOf: boolean;
}

const InterventionFull: FC<InterventionFullProps> = ({
  renderPartOf,
}) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property label={ontola.publishAction} onLoad={() => null} />
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={rdfx.type} />
          <LinkedDetailDate />
          <Property label={argu.pinnedAt} />
          <Property label={argu.expiresAt} />
          <Property label={argu.followsCount} />
          <Property label={schema.location} />
          <Property label={argu.grantedGroups} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={schema.text} />
          <AttributeList>
            <AttributeListItem label={schema.isPartOf} propertyLabel="Interventietype" />
            <AttributeListItem label={schema.name} propertyLabel="Interventie" />
            <AttributeListItem label={rivm.organizationName} propertyLabel="Bedrijf" />
            <Property label={schema.image}>
              <AttributeListItem label={ontola.imgUrl568x400} style={{ maxHeight: '10em' }} />
            </Property>
            <AttributeListItem label={rivm.businessSectionEmployees} />
            <AttributeListItem label={schema.industry} />
            <AttributeListItem label={schema.creator} propertyLabel="Contactpersoon" />
            <AttributeListItem label={argu.communicateAction} propertyLabel="Contact" />
            <AttributeListItem label={schema.datePublished} propertyLabel="Datum online" />
          </AttributeList>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>Doelen &amp; doelgroepen</Heading>
          <AttributeList>
            <AttributeListItem label={rivm.targetAudience} />
            <AttributeListItem label={rivm.interventionEffects} />
          </AttributeList>
          <p><Property label={rivm.interventionGoal} /></p>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>Invoering</Heading>
          <AttributeList>
            <AttributeListItem label={rivm.continuous} />
            <AttributeListItem label={rivm.independent} />
            <AttributeListItem label={rivm.specificToolsRequired} />
            <AttributeListItem label={rivm.managementInvolvement} />
            <AttributeListItem label={rivm.trainingRequired} />
          </AttributeList>
          <p><Property label={rivm.additionalIntroductionInformation} /></p>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>Kosten</Heading>
          <AttributeList>
            <AttributeListItem
              label={rivm.oneOffCostsScore}
              labelFrom={rivm.oneOffCosts}
            />
            <AttributeListItem
              label={rivm.recurringCostsScore}
              labelFrom={rivm.recurringCosts}
            />
            <AttributeListItem
              label={rivm.natureOfCosts}
            />
          </AttributeList>
          <p><Property label={rivm.costExplanation} /></p>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>Effectiviteit</Heading>
          <AttributeList>
            <AttributeListItem
              label={rivm.securityImprovedScore}
              labelFrom={rivm.securityImproved}
            />
          </AttributeList>
          <p><Property label={rivm.securityImprovementReason} /></p>
        </CardContent>
        <CardRow noBorder>
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

InterventionFull.type = rivm.Intervention;

InterventionFull.topology = fullResourceTopology;

export default register(InterventionFull);