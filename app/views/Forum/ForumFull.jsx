import * as schema from '@ontologies/schema';
import {
  Property,
  ReturnType,
  linkType,
  register,
  useDataInvalidation,
  useProperty,
  useResourceLink,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Grid from '../../topologies/Grid';
import PageHeader from '../../topologies/PageHeader';

const coverPhotoMap = {
  coverPhotoUrl: ontola.imgUrl1500x2000,
  positionY: ontola.imagePositionY,
};
const coverPhotoOpts = { returnType: ReturnType.Value };

const ForumFull = () => {
  const [coverPhoto] = useProperty(ontola.coverPhoto);
  const [hideHeader] = useProperty(ontola.hideHeader);

  useDataInvalidation(coverPhoto);
  const { coverPhotoUrl, positionY } = useResourceLink(coverPhoto, coverPhotoMap, coverPhotoOpts);

  return (
    <React.Fragment>
      {(hideHeader?.value !== 'true')
      && (
        <PageHeader
          background={coverPhotoUrl}
          positionY={positionY}
        />
      )}
      <Container size="large">
        <Grid
          container
          spacing={6}
        >
          <Property label={ontola.widgets} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

ForumFull.type = [argu.ContainerNode, schema.WebPage];

ForumFull.propTypes = {
  coverPhoto: linkType,
  hideHeader: linkType,
};

ForumFull.topology = fullResourceTopology;

export default register(ForumFull);
