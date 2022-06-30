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

import { LibroTheme, Margin } from '../../../../../themes/themes';
import { allTopologies } from '../../../../../topologies';
import ButtonWithFeedback from '../../../../Common/components/ButtonWithFeedback';
import { quadruple } from '../../../../Common/lib/quadruple';
import ontola from '../../../../Core/ontology/ontola';

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
        quadruple(subject, ontola.void, rdf.literal(0)),
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
