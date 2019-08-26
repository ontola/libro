import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { LoadingFiller } from '../../components/Loading/index';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container/index';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';

const ForumPage = ({ hideHeader }) => (
  <PrimaryResource>
    {(hideHeader?.value !== 'true') && <PageHeader />}
    <Container grid>
      <Property label={NS.ontola('widgets')} onLoad={LoadingFiller} />
    </Container>
  </PrimaryResource>
);

ForumPage.type = [NS.argu('ContainerNode'), NS.schema('WebPage')];

ForumPage.mapDataToProps = [
  NS.argu('hideHeader'),
];

ForumPage.propTypes = {
  hideHeader: linkType,
};

ForumPage.topology = [
  primaryResourceTopology,
  pageTopology,
];

export default register(ForumPage);
