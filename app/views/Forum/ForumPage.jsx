import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LoadingFiller } from '../../components/Loading/index';
import { entityIsLoaded } from '../../helpers/data';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container/index';
import Grid from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';

const ForumPage = ({ coverPhoto, hideHeader }) => {
  const lrs = useLRS();
  let coverPhotoUrl, positionY;
  if (coverPhoto) {
    useDataInvalidation({ subject: coverPhoto });

    if (__CLIENT__ && !entityIsLoaded(lrs, coverPhoto)) {
      lrs.queueEntity(coverPhoto);
    }
    coverPhotoUrl = lrs.getResourceProperty(coverPhoto, ontola.imgUrl1500x2000);
    positionY = lrs.getResourceProperty(coverPhoto, ontola.imagePositionY);
  }

  return (
    <PrimaryResource>
      {(hideHeader?.value !== 'true')
      && <PageHeader background={coverPhotoUrl?.value} positionY={positionY?.value} />}
      <Container size="large">
        <Grid container spacing={6}>
          <Property label={ontola.widgets} onLoad={LoadingFiller} />
        </Grid>
      </Container>
    </PrimaryResource>
  );
};

ForumPage.type = [argu.ContainerNode, schema.WebPage];

ForumPage.mapDataToProps = {
  coverPhoto: ontola.coverPhoto,
  hideHeader: argu.hideHeader,
  name: schema.name,
  widgets: ontola.widgets,
};

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
