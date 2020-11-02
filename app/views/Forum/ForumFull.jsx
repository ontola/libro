import * as as from '@ontologies/as';
import schema from '@ontologies/schema';
import {
  Property,
  ReturnType,
  linkType,
  register,
  useDataInvalidation,
  useResourceLink,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container/index';
import Grid from '../../topologies/Grid';
import { fullResourceTopology } from '../../topologies/FullResource';
import PageHeader from '../../topologies/PageHeader';

const coverPhotoMap = {
  coverPhotoUrl: ontola.imgUrl1500x2000,
  positionY: ontola.imagePositionY,
};
const coverPhotoOpts = { returnType: ReturnType.Value };

const ForumFull = ({ coverPhoto, hideHeader }) => {
  useDataInvalidation(coverPhoto);
  const { coverPhotoUrl, positionY } = useResourceLink(coverPhoto, coverPhotoMap, coverPhotoOpts);

  return (
    <React.Fragment>
      {(hideHeader?.value !== 'true')
      && <PageHeader background={coverPhotoUrl} positionY={positionY} />}
      <Container size="large">
        <Grid container spacing={6}>
          <Property label={ontola.widgets}>
            <Property label={ontola.pages}>
              <Property label={as.items} />
            </Property>
          </Property>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

ForumFull.type = [argu.ContainerNode, schema.WebPage];

ForumFull.mapDataToProps = {
  coverPhoto: ontola.coverPhoto,
  hideHeader: ontola.hideHeader,
  name: schema.name,
  widgets: ontola.widgets,
};

ForumFull.propTypes = {
  coverPhoto: linkType,
  hideHeader: linkType,
};

ForumFull.topology = fullResourceTopology;

ForumFull.linkOpts = {
  forceRender: true,
};


export default register(ForumFull);
