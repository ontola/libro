import {
  Property,
  linkType,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LoadingFiller } from '../../components/Loading/index';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container/index';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';

const ForumPage = ({ coverPhoto, hideHeader }) => {
  const lrs = useLRS();
  const coverPhotoUrl = coverPhoto && lrs.getResourceProperty(coverPhoto, NS.argu('imgUrl1500x2000'));
  const positionY = coverPhoto && lrs.getResourceProperty(coverPhoto, NS.argu('imagePositionY'));

  return (
    <PrimaryResource>
      {(hideHeader?.value !== 'true')
      && <PageHeader background={coverPhotoUrl?.value} positionY={positionY?.value} />}
      <Container grid>
        <Property label={NS.ontola('widgets')} onLoad={LoadingFiller} />
      </Container>
    </PrimaryResource>
  );
};

ForumPage.type = [NS.argu('ContainerNode'), NS.schema('WebPage')];

ForumPage.mapDataToProps = [
  NS.argu('coverPhoto'),
  NS.argu('hideHeader'),
  NS.ontola('widgets'),
  NS.schema.name,
];

ForumPage.propTypes = {
  coverPhoto: linkType,
  hideHeader: linkType,
};

ForumPage.topology = [
  primaryResourceTopology,
  pageTopology,
];

ForumPage.linkOpts = {
  forceRender: true,
};


export default register(ForumPage);
