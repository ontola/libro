import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import {
  AttributeListItem,
  CardContent,
  Heading,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import AttributeList from '../../topologies/AttributeList';
import ActionsBar from '../../topologies/ActionsBar';
import { CardDivider } from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

const InterventionPage = ({
  employment,
}) => {
  const lrs = useLRS();
  const image = lrs.getResourceProperty(employment, schema.image);

  return (
    <PrimaryResource>
      <Property label={ontola.coverPhoto} />
      <Container>
        <Property label={schema.isPartOf} />
        <Property label={argu.trashedAt} />
        <CardMain>
          <DetailsBar
            right={(
              <React.Fragment>
                <Property label={ontola.followMenu} />
                <Property label={ontola.shareMenu} />
                <Property label={ontola.actionsMenu} />
              </React.Fragment>
            )}
          >
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
              <Resource subject={employment}>
                <AttributeListItem label={schema.name} propertyLabel="Bedrijf" />
              </Resource>
              {image && (
                <Resource subject={image}>
                  <AttributeListItem label={ontola.imgUrl568x400} style={{ maxHeight: '10em' }} />
                </Resource>
              )}
              <AttributeListItem label={rivm.businessSectionEmployees} />
              <Resource subject={employment}>
                <AttributeListItem label={schema.industry} />
              </Resource>
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
            <Property forceRender label={NS.app('omniform')} />
          </CardAppendix>
        </CardMain>
        <Property label={ontola.publishAction} onLoad={() => null} />
      </Container>
      <Container>
        <Property label={schema.comment} />
      </Container>
    </PrimaryResource>
  );
};

InterventionPage.type = rivm.Intervention;

InterventionPage.topology = pageTopology;

InterventionPage.mapDataToProps = {
  employment: rivm.employment,
};

InterventionPage.propTypes = {
  employment: linkType,
};

export default register(InterventionPage);
