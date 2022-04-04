import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import Heading from '../../../components/Heading';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import { LoadingHidden } from '../../../components/Loading';
import argu from '../../../ontology/argu';
import meeting from '../../../ontology/meeting';
import ontola from '../../../ontology/ontola';
import rivm from '../../../ontology/rivm';
import { fullResourceTopology } from '../../../topologies';
import ActionsBar from '../../../topologies/ActionsBar';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import CardRow from '../../../topologies/Card/CardRow';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { defaultMenus } from '../../common';

const InterventionFull: FC = () => (
  <React.Fragment>
    <Container>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
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
            <AttributeListItem
              label={schema.isPartOf}
              propertyLabel="Interventietype"
            />
            <AttributeListItem
              label={schema.name}
              propertyLabel="Interventie"
            />
            <AttributeListItem
              label={rivm.organizationName}
              propertyLabel="Bedrijf"
            />
            <Property label={schema.image}>
              <AttributeListItem
                label={ontola.imgUrl568x400}
                propertyLabel=""
                style={{ maxHeight: '10em' }}
              />
            </Property>
            <AttributeListItem
              label={rivm.businessSectionEmployees}
              propertyLabel="Omvang"
            />
            <AttributeListItem
              label={schema.industry}
              propertyLabel="Sector"
            />
            <AttributeListItem
              label={schema.creator}
              propertyLabel="Contactpersoon"
            />
            <AttributeListItem
              label={argu.communicateAction}
              propertyLabel="Contact"
            />
            <AttributeListItem
              label={schema.datePublished}
              propertyLabel="Datum online"
            />
          </AttributeList>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>
            Doelen &amp; doelgroepen
          </Heading>
          <AttributeList>
            <AttributeListItem
              label={rivm.targetAudience}
              propertyLabel="Doelgroep"
            />
            <AttributeListItem
              label={rivm.interventionEffects}
              propertyLabel="Bedoelde effecten"
            />
          </AttributeList>
          <p>
            <Property label={rivm.interventionGoal} />
          </p>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>
            Invoering
          </Heading>
          <AttributeList>
            <AttributeListItem
              label={rivm.continuous}
              propertyLabel="Aard van de interventie"
            />
            <AttributeListItem
              label={rivm.independent}
              propertyLabel="Zelfstandig of ondersteund door een derde partij"
            />
            <AttributeListItem
              label={rivm.specificToolsRequired}
              propertyLabel="Gereedschap, materiaal en (reserve) onderdelen"
            />
            <AttributeListItem
              label={rivm.managementInvolvement}
              propertyLabel="Belang betrokken management"
            />
            <AttributeListItem
              label={rivm.trainingRequired}
              propertyLabel="Training of opleiding nodig"
            />
          </AttributeList>
          <p>
            <Property
              label={rivm.additionalIntroductionInformation}
              propertyLabel="Extra informatie over het invoeren van de interventie"
            />
          </p>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>
            Kosten
          </Heading>
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
              propertyLabel="De aard van deze kosten was"
            />
          </AttributeList>
          <p>
            <Property label={rivm.costExplanation} />
          </p>
        </CardContent>
        <CardDivider />
        <CardContent noSpacing>
          <Heading>
            Effectiviteit
          </Heading>
          <AttributeList>
            <AttributeListItem
              label={rivm.securityImprovedScore}
              labelFrom={rivm.securityImproved}
            />
          </AttributeList>
          <p>
            <Property label={rivm.securityImprovementReason} />
          </p>
        </CardContent>
        <CardRow>
          <Property
            label={argu.attachments}
            onLoad={LoadingHidden}
          />
          <Property
            label={meeting.attachment}
            onLoad={LoadingHidden}
          />
        </CardRow>
        <ActionsBar>
          <Property
            label={ontola.favoriteAction}
            onLoad={LoadingHidden}
          />
        </ActionsBar>
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
