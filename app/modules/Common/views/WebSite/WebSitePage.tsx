import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import argu from '../../../Argu/ontology/argu';
import ontola from '../../../Kernel/ontology/ontola';
import CardContent from '../../components/Card/CardContent';
import HomepageError from '../../components/Error/HomepageError';
import HeadingContext from '../../components/Heading/HeadingContext';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';

const WebSitePage = () => {
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
      {hideHeader?.value !== 'true' && (
        <HeadingContext>
          <PageHeader />
        </HeadingContext>
      )}
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

WebSitePage.type = [
  schema.Organization,
  argu.Page,
  schema.WebSite,
];

WebSitePage.topology = pageTopology;

export default register(WebSitePage);
