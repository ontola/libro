import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import { SomeNode } from 'link-lib/dist-types/types';
import {
  PropertyProps,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import ButtonWithFeedback from '../../../components/ButtonWithFeedback';
import { quadruple } from '../../../helpers/quadruple';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { LibroTheme, Margin } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';

interface InfiniteCollectionNextProps extends SubjectProp, PropertyProps {}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  paginationButton: {
    marginTop: theme.spacing(Margin.Medium),
  },
}));

const InfiniteCollectionNext = ({
  linkedProp,
  subject,
}: InfiniteCollectionNextProps): JSX.Element => {
  const lrs = useLRS();
  const [partOf] = useProperty(as.partOf);
  const classes = useStyles();

  const onClick = useCallback(
    () => new Promise(() => {
      lrs.store.addQuads([
        quadruple(partOf as SomeNode, ontola.pages, linkedProp),
        quadruple(subject, argu.void, rdf.literal(0)),
      ]);
      (lrs as any).broadcast();
    }),
    [lrs, partOf, linkedProp, subject],
  );

  return (
    <ButtonWithFeedback
      className={classes.paginationButton}
      onClick={onClick}
    >
      <FormattedMessage
        defaultMessage="Load more"
        id="https://app.argu.co/i18n/collection/loadMore"
      />
    </ButtonWithFeedback>
  );
};

InfiniteCollectionNext.type = ontola.InfiniteView;

InfiniteCollectionNext.property = as.next;

InfiniteCollectionNext.topology = allTopologies;

export default register(InfiniteCollectionNext);
