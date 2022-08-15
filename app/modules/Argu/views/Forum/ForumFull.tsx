import makeStyles from '@mui/styles/makeStyles';
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

import { fullResourceTopology } from '../../../Common/topologies';
import { LibroTheme, Size } from '../../../Kernel/lib/themes';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import Container from '../../../Common/topologies/Container';
import Grid from '../../../Common/topologies/Grid';
import PageHeader from '../../../Common/topologies/PageHeader';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const useStyles = makeStyles<LibroTheme>((theme) => ({
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
