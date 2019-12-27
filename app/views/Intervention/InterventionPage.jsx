import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import {
  AttributeListItem,
  CardContent,
  Heading,
  Link,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import AttributeList from '../../topologies/AttributeList';
import ActionsBar from '../../topologies/ActionsBar';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';
import { inlineTopology } from '../../topologies/Inline';
import LabeledAttribute from '../../components/LabeledAttribute';

const InterventionPage = ({
  employment,
  isPartOf,
}) => {
  const lrs = useLRS();
  const interventionType = lrs.getResourceProperty(isPartOf, schema.name);
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
            <p>Interventietype: <Property label={schema.isPartOf} topology={inlineTopology} /></p>
            <Heading>Aandrager</Heading>
            {
              image && (
                <span>
                  <LinkedResourceContainer subject={image}>
                    <Property label={NS.ontola('imgUrl568x400')} style={{ maxHeight: '10em' }} />
                  </LinkedResourceContainer>
                </span>
              )
            }
            <AttributeList>
              <AttributeListItem label={schema.name} propertyLabel="Interventie" />
              <LinkedResourceContainer subject={employment}>
                <AttributeListItem label={schema.name} propertyLabel="Bedrijf" />
              </LinkedResourceContainer>
              <AttributeListItem label={rivm.businessSectionEmployees} />
              <LinkedResourceContainer subject={employment}>
                <AttributeListItem label={schema.industry} />
              </LinkedResourceContainer>
              <AttributeListItem label={schema.creator} propertyLabel="Contactpersoon" />
              <AttributeListItem label={schema.datePublished} propertyLabel="Datum online" />
            </AttributeList>
            <AttributeList>
              <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
              <AttributeListItem
                label={rivm.securityImprovedScore}
                labelFrom={rivm.securityImproved}
              />
              <AttributeListItem
                label={rivm.oneOffCostsScore}
                labelFrom={rivm.oneOffCosts}
              />
              <AttributeListItem
                label={rivm.recurringCostsScore}
                labelFrom={rivm.recurringCosts}
              />
            </AttributeList>
          </CardContent>
          <CardContent noSpacing>
            <Heading>Beschrijving</Heading>
            <LabeledAttribute label={schema.text} propertyLabel="Korte beschrijving" />
            <LabeledAttribute label={rivm.interventionGoal} />
            <LabeledAttribute label={rivm.targetAudience} />
            <LabeledAttribute label={rivm.interventionEffects} />
          </CardContent>
          <CardContent noSpacing>
            <Heading>Invoeren van de interventie</Heading>
            <AttributeList>
              <AttributeListItem label={rivm.continuous} />
              <AttributeListItem label={rivm.independent} />
              <AttributeListItem label={rivm.specificToolsRequired} />
              <AttributeListItem label={rivm.managementInvolvement} />
              <AttributeListItem label={rivm.trainingRequired} />
            </AttributeList>
            <LabeledAttribute label={rivm.additionalIntroductionInformation} />
          </CardContent>
          <CardContent noSpacing>
            <Heading>Kosten</Heading>
            <p>
              <span>
                Het invoeren en blijven uitvoeren van een interventie heeft bepaalde kosten.
                De eenmalige kosten zijn ingeschat als{' '}
              </span>
              <span style={{ textTransform: 'lowercase' }}><strong><Property label={rivm.oneOffCosts} topology={inlineTopology} /></strong></span>
              <span>. De doorlopende kosten zijn ingeschat als </span>
              <span style={{ textTransform: 'lowercase' }}><strong><Property label={rivm.recurringCosts} topology={inlineTopology} /></strong></span>
              <span>.</span>
            </p>
            <div className="Markdown">
              <LabeledAttribute label={rivm.natureOfCosts} wrapper="ul" />
            </div>
            <LabeledAttribute label={rivm.costExplanation} />
          </CardContent>
          <CardContent noSpacing>
            <Heading>Ervaren effectiviteit</Heading>
            <Property label={rivm.effectivityResearchMethod} />
            <LabeledAttribute label={rivm.securityImprovementReason} />
            <Heading size={4}>Andere ervaringen</Heading>
            {
              interventionType && (
                <p>
                  Dit is een voorbeeld van een interventie van het type{' '}
                  <strong>{interventionType.value}</strong>.
                  Andere ervaringen met dit interventietype vindt u{' '}
                  <Link to={isPartOf.value}>hier</Link>.
                </p>
              )
            }
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
  isPartOf: schema.isPartOf,
};

InterventionPage.propTypes = {
  employment: linkType,
  isPartOf: linkType,
};

export default register(InterventionPage);
