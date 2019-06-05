import {
  linkType,
  Property,
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

class OrganizationPage extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page'), NS.schema('WebSite')];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  static mapDataToProps = [
    NS.foaf('homepage'),
    NS.schema('name'),
  ];

  static propTypes = {
    homepage: linkType,
  };

  render() {
    const { homepage } = this.props;

    if (homepage) {
      return (
        <Property label={NS.foaf('homepage')} />
      );
    }

    return (
      <PrimaryResource>
        <PageHeader />
        <Container>
          <Card>
            <CardContent>
              <p>
                <FormattedMessage
                  defaultMessage="This website is private. Only members are allowed to view its contents. Ask a member or the managers about how you can get access."
                  id="https://app.argu.co/i18n/pages/closed"
                />
              </p>
            </CardContent>
          </Card>
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(OrganizationPage);
