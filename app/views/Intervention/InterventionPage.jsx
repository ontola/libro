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
import AttributeList from '../../topologies/AttributeList';
import ActionsBar from '../../topologies/ActionsBar';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
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
  const interventionType = lrs.getResourceProperty(isPartOf, NS.schema('name'));
  const image = lrs.getResourceProperty(employment, NS.schema('image'));

  return (
    <PrimaryResource>
      <Property label={NS.ontola('coverPhoto')} />
      <Container>
        <Property label={NS.schema('isPartOf')} />
        <Property label={NS.argu('trashedAt')} />
        <CardMain>
          <DetailsBar
            right={(
              <React.Fragment>
                <Property label={NS.ontola('followMenu')} />
                <Property label={NS.ontola('shareMenu')} />
                <Property label={NS.ontola('actionsMenu')} />
              </React.Fragment>
            )}
          >
            <Property label={NS.rdf('type')} />
            <LinkedDetailDate />
            <Property label={NS.argu('pinnedAt')} />
            <Property label={NS.argu('expiresAt')} />
            <Property label={NS.argu('followsCount')} />
            <Property label={NS.schema('location')} />
            <Property label={NS.argu('grantedGroups')} />
          </DetailsBar>
          <CardContent noSpacing>
            <Property label={[NS.schema('name'), NS.rdfs('label')]} />
            <p>Interventietype: <Property label={NS.schema('isPartOf')} topology={inlineTopology} /></p>
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
              <AttributeListItem label={NS.schema('name')} propertyLabel="Interventie" />
              <LinkedResourceContainer subject={employment}>
                <AttributeListItem label={NS.schema('name')} propertyLabel="Bedrijf" />
              </LinkedResourceContainer>
              <AttributeListItem label={NS.rivm('businessSectionEmployees')} />
              <LinkedResourceContainer subject={employment}>
                <AttributeListItem label={NS.schema('industry')} />
              </LinkedResourceContainer>
              <AttributeListItem label={NS.schema('creator')} propertyLabel="Contactpersoon" />
              <AttributeListItem label={NS.schema('datePublished')} propertyLabel="Datum online" />
            </AttributeList>
            <AttributeList>
              <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
              <AttributeListItem label={NS.rivm('securityImprovedScore')} />
              <AttributeListItem label={NS.rivm('oneOffCostsScore')} />
              <AttributeListItem label={NS.rivm('recurringCostsScore')} />
            </AttributeList>
          </CardContent>
          <CardContent noSpacing>
            <Heading>Beschrijving</Heading>
            <LabeledAttribute label={NS.schema('text')} propertyLabel="Korte beschrijving" />
            <LabeledAttribute label={NS.rivm('interventionGoal')} />
            <LabeledAttribute label={NS.rivm('targetAudience')} />
            <LabeledAttribute label={NS.rivm('interventionEffects')} />
          </CardContent>
          <CardContent noSpacing>
            <Heading>Invoeren van de interventie</Heading>
            <AttributeList>
              <AttributeListItem label={NS.rivm('continuous')} />
              <AttributeListItem label={NS.rivm('independent')} />
              <AttributeListItem label={NS.rivm('specificToolsRequired')} />
              <AttributeListItem label={NS.rivm('managementInvolvement')} />
              <AttributeListItem label={NS.rivm('trainingRequired')} />
            </AttributeList>
            <LabeledAttribute label={NS.rivm('additionalIntroductionInformation')} />
          </CardContent>
          <CardContent noSpacing>
            <Heading>Kosten</Heading>
            <p>
              <span>
                Het invoeren en blijven uitvoeren van een interventie heeft bepaalde kosten.
                De eenmalige kosten zijn ingeschat als{' '}
              </span>
              <span style={{ textTransform: 'lowercase' }}><strong><Property label={NS.rivm('oneOffCosts')} topology={inlineTopology} /></strong></span>
              <span>. De doorlopende kosten zijn ingeschat als </span>
              <span style={{ textTransform: 'lowercase' }}><strong><Property label={NS.rivm('recurringCosts')} topology={inlineTopology} /></strong></span>
              <span>.</span>
            </p>
            <div className="Markdown">
              <LabeledAttribute label={NS.rivm('natureOfCosts')} wrapper="ul" />
            </div>
            <LabeledAttribute label={NS.rivm('costExplanation')} />
          </CardContent>
          <CardContent noSpacing>
            <Heading>Ervaren effectiviteit</Heading>
            <Property label={NS.rivm('effectivityResearchMethod')} />
            <LabeledAttribute label={NS.rivm('securityImprovementReason')} />
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
          <CardContent noSpacing>
            <Property label={NS.meeting('attachment')} onLoad={() => null} />
            <Property label={NS.argu('attachments')} onLoad={() => null} />
          </CardContent>
          <ActionsBar>
            <Property label={NS.ontola('favoriteAction')} onLoad={() => null} />
          </ActionsBar>
          <CardAppendix>
            <Property forceRender label={NS.app('omniform')} />
          </CardAppendix>
        </CardMain>
        <Property label={NS.ontola('publishAction')} onLoad={() => null} />
      </Container>
      <Container>
        <Property label={NS.schema('comment')} />
      </Container>
    </PrimaryResource>
  );
};

InterventionPage.type = NS.rivm('Intervention');

InterventionPage.topology = pageTopology;

InterventionPage.mapDataToProps = [
  NS.schema('isPartOf'),
  NS.rivm('employment'),
];

InterventionPage.propTypes = {
  employment: linkType,
  isPartOf: linkType,
};

export default register(InterventionPage);
