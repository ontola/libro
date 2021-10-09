import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useGlobalIds, 
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import TabbarProvider from '../../components/TabbarProvider';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';

interface SurveyFullProps {
  renderPartOf: boolean;
}

const SurveyFull: FC<SurveyFullProps> = ({
  renderPartOf,
}) => {
  const [settingsMenu] = useGlobalIds(ontola.settingsMenu);

  return (
    <TabbarProvider
      redirect
      menu={settingsMenu}
    >
      <Container>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property label={argu.trashedAt} />
        <Property
          label={ontola.publishAction}
          onLoad={() => null}
        />
        <CardMain data-test="Thing-thing">
          <DetailsBar
            right={(
              <React.Fragment>
                <Property label={ontola.followMenu} />
                <Property label={ontola.shareMenu} />
                <Property label={ontola.actionsMenu} />
              </React.Fragment>
            )}
          >
            <Property label={schema.creator} />
            <Property label={rdfx.type} />
            <LinkedDetailDate />
            <Property label={argu.pinnedAt} />
            <Property label={argu.expiresAt} />
            <Property label={argu.followsCount} />
            <Property label={argu.motionsCount} />
            <Property label={schema.location} />
            <Property label={argu.grantedGroups} />
          </DetailsBar>
          <CardContent
            endSpacing
            noSpacing
          >
            <Property label={[schema.name, rdfs.label]} />
            <Property label={[schema.text, schema.description, dbo.abstract]} />
          </CardContent>
          <Property
            forceRender
            label={app.menuTabs}
          />
        </CardMain>
      </Container>
      <Property
        forceRender
        label={app.currentTab}
      />
    </TabbarProvider>
  );
};

SurveyFull.type = [argu.Survey];

SurveyFull.topology = fullResourceTopology;

export default register(SurveyFull);
