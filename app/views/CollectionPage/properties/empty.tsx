import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  PropertyProps,
  register,
  useFields,
  useGlobalIds,
  useTopology,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardContent from '../../../components/Card/CardContent';
import { useCollectionOptions, useHasInteraction } from '../../../components/Collection/CollectionProvider';
import GridItem from '../../../components/Grid/GridItem';
import { isTableDisplay } from '../../../helpers/collections';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import { LibroTheme } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';
import Container, { containerTopology } from '../../../topologies/Container';
import TableCell from '../../../topologies/TableCell';
import TableRow from '../../../topologies/TableRow';

const useStyles = makeStyles((theme: LibroTheme) => ({
  empty: {
    color: theme.palette.grey.midDark,
  },
}));

const Empty: FC<PropertyProps> = () => {
  const topology = useTopology();
  const [baseCollection] = useGlobalIds(ontola.baseCollection);
  const hasInteraction = useHasInteraction(baseCollection);

  const styles = useStyles();
  const {
    collectionDisplay,
    columns,
  } = useCollectionOptions();
  const collectionType = useFields(baseCollection, rdfx.type);

  const message = (
    <span className={styles.empty}>
      <FormattedMessage
        defaultMessage="No items yet"
        id="https://app.argu.co/i18n/collection/empty/message"
      />
    </span>
  );

  if (isTableDisplay(collectionDisplay)) {
    return (
      <TableRow>
        <TableCell colSpan={columns?.length ?? 1}>
          {message}
        </TableCell>
      </TableRow>
    );
  }

  if (collectionType.includes(ontola.SearchResult) || hasInteraction) {
    return null;
  }

  if (rdf.equals(collectionDisplay, ontola['collectionDisplay/card'])) {
    return (
      <CardContent endSpacing>
        {message}
      </CardContent>
    );
  }

  if (rdf.equals(collectionDisplay, ontola['collectionDisplay/grid'])) {
    return (
      <GridItem>
        {message}
      </GridItem>
    );
  }

  if (rdf.equals(collectionDisplay, ontola['collectionDisplay/default']) && topology !== containerTopology) {
    return (
      <Container>
        {message}
      </Container>
    );
  }

  return message;
};

Empty.type = as.CollectionPage;

Empty.topology = allTopologies;

Empty.property = app.empty;

export default register(Empty);
