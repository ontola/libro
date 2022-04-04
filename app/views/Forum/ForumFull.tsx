import { makeStyles } from '@material-ui/core/styles';
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

import HeadingContext from '../../components/Heading/HeadingContext';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { Size } from '../../themes/themes';
import { fullResourceTopology } from '../../topologies';
import Container from '../../topologies/Container';
import Grid from '../../topologies/Grid';
import PageHeader from '../../topologies/PageHeader';

const useStyles = makeStyles((theme) => ({
  pageBackground: {
    backgroundColor: theme.palette.background.default,
    paddingTop: '2rem',
    position: 'relative',
  },
}));

const ForumFull = () => {
  const classes = useStyles();
  const [coverPhoto] = useIds(ontola.coverPhoto);
  const [hideHeader] = useProperty(ontola.hideHeader);

  useDataInvalidation(coverPhoto);
  const [coverPhotoUrl] = useValues(coverPhoto, ontola.imgUrl1500x2000);
  const [positionY] = useNumbers(coverPhoto, ontola.imagePositionY);

  return (
    <HeadingContext>
      {(hideHeader?.value !== 'true')
      && (
        <PageHeader
          background={coverPhotoUrl}
          positionY={positionY}
        />
      )}
      <div className={classes.pageBackground}>
        <Container size={Size.Large}>
          <Grid
            container
            spacing={6}
          >
            <Property label={ontola.widgets} />
          </Grid>
        </Container>
      </div>
    </HeadingContext>
  );
};

ForumFull.type = [argu.ContainerNode, schema.WebPage];

ForumFull.propTypes = {
  coverPhoto: linkType,
  hideHeader: linkType,
};

ForumFull.topology = fullResourceTopology;

export default register(ForumFull);
