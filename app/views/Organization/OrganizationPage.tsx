import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import PageHeader from '../../topologies/PageHeader';
import Card from '../../topologies/Card';
import CardContent from '../../components/Card/CardContent';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import HomepageError from '../../components/Error/HomepageError';

const OrganizationPage = () => {
  const [hideHeader] = useProperty(ontola.hideHeader);
  const [homepage] = useProperty(foaf.homepage);
  const [name] = useProperty(schema.name);

  if (homepage) {
    return (
      <Resource
        subject={homepage}
        onError={HomepageError}
      />
    );
  }

  return (
    <React.Fragment>
      {hideHeader?.value !== 'true' && <PageHeader />}
      <Container>
        <Card>
          <CardContent>
            <p>
              <FormattedMessage
                defaultMessage="Welcome to {name}!"
                id="https://app.argu.co/i18n/pages/noHomepage"
                values={{ name: name?.value }}
              />
            </p>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

OrganizationPage.type = [
  schema.Organization,
  argu.Page,
  schema.WebSite,
];

OrganizationPage.topology = pageTopology;

export default register(OrganizationPage);
