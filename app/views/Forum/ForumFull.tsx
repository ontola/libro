import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  useDataInvalidation,
  useIds,
  useNumbers,
  useProperty,
  useValues,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { Size } from '../../themes/themes';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Grid from '../../topologies/Grid';
import PageHeader from '../../topologies/PageHeader';

const ForumFull = () => {
  const [coverPhoto] = useIds(ontola.coverPhoto);
  const [hideHeader] = useProperty(ontola.hideHeader);

  useDataInvalidation(coverPhoto);
  const [coverPhotoUrl] = useValues(coverPhoto, ontola.imgUrl1500x2000);
  const [positionY] = useNumbers(coverPhoto, ontola.imagePositionY);

  return (
    <React.Fragment>
      {(hideHeader?.value !== 'true')
      && (
        <PageHeader
          background={coverPhotoUrl}
          positionY={positionY}
        />
      )}
      <Container size={Size.Large}>
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
