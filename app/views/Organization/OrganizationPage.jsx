import foaf from '@ontologies/foaf';
import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import Card from '../../topologies/Card';
import CardContent from '../../components/Card/CardContent';
import Container from '../../topologies/Container';
import HomepageError from '../Error/HomepageError';

const OrganizationPage = ({
  homepage,
  name,
  hideHeader,
}) => {
  if (homepage) {
    return <LinkedResourceContainer subject={homepage} onError={HomepageError} />;
  }

  return (
    <PrimaryResource>
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
    </PrimaryResource>
  );
};

OrganizationPage.type = [
  schema.Organization,
  NS.argu('Page'),
  schema.WebSite,
];

OrganizationPage.topology = [
  primaryResourceTopology,
  pageTopology,
];

OrganizationPage.mapDataToProps = {
  hideHeader: NS.argu('hideHeader'),
  homepage: foaf.homepage,
  name: schema.name,
};

OrganizationPage.propTypes = {
  hideHeader: linkType,
  homepage: linkType,
  name: linkType,
};

export default register(OrganizationPage);
