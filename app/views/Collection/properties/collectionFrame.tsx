import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import rdf, { SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { defineMessages, useIntl } from 'react-intl';

import CollectionFrame from '../../../components/Collection/CollectionFrame';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import HeaderWithMenu from '../../../components/HeaderWithMenu';
import ontola from '../../../ontology/ontola';
import { LibroTheme } from '../../../themes/themes';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { alertDialogTopology } from '../../../topologies/Dialog';
import { gridTopology } from '../../../topologies/Grid';
import { pageTopology } from '../../../topologies/Page';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';

interface CollectionFrameProps {
  linkedProp: SomeTerm;
  onDone?: () => void;
}

const messages = defineMessages({
  close: {
    defaultMessage: 'Close',
    id: 'https://app.argu.co/i18n/forms/actions/close',
  },
});

const LARGE_CONTAINER_DISPLAYS = [
  rdf.id(ontola.ns('collectionDisplay/grid')),
  rdf.id(ontola.ns('collectionDisplay/settingsTable')),
  rdf.id(ontola.ns('collectionDisplay/table')),
];

const useStyles = makeStyles<LibroTheme>((theme) => ({
  wrapper: {
    background: theme.palette.background.default,
    borderRadius: '.5em',
    overflow: 'hidden',
    padding: '1em',
  },
}));

const DefaultCollectionFrame: FC<CollectionFrameProps> = () => {
  const {
    collectionDisplay,
    hideHeader,
  } = useCollectionOptions();

  const Wrapper = (LARGE_CONTAINER_DISPLAYS.includes(rdf.id(collectionDisplay))) ? LargeContainer : Container;

  return (
    <CollectionFrame Wrapper={Wrapper} hideHeader={hideHeader} />
  );
};
DefaultCollectionFrame.type = CollectionTypes;
DefaultCollectionFrame.topology = allTopologiesExcept(alertDialogTopology, containerTopology, gridTopology, pageTopology);
DefaultCollectionFrame.property = ontola.collectionFrame;

const WrappedCollectionFrame: FC<CollectionFrameProps> = () => {
  const { hideHeader } = useCollectionOptions();

  return (
    <CollectionFrame Wrapper={React.Fragment} hideHeader={hideHeader} />
  );
};
WrappedCollectionFrame.type = CollectionTypes;
WrappedCollectionFrame.topology = [containerTopology, gridTopology];
WrappedCollectionFrame.property = ontola.collectionFrame;

const DialogCollectionFrame: FC<CollectionFrameProps> = ({
  onDone,
}) => {
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const closeButton = React.useCallback(() => (
    <IconButton
      size="small"
      title={formatMessage(messages.close)}
      type="button"
      onClick={onDone}
    >
      <FontAwesome name="close" />
    </IconButton>
  ), [onDone]);

  return (
    <Container className={classes.wrapper}>
      <HeaderWithMenu
        menu={closeButton}
      >
        <Property label={as.name} wrapper={React.Fragment} />
      </HeaderWithMenu>
      <CollectionFrame hideHeader Wrapper={React.Fragment} />
    </Container>
  );
};
DialogCollectionFrame.type = CollectionTypes;
DialogCollectionFrame.topology = alertDialogTopology;
DialogCollectionFrame.property = ontola.collectionFrame;

export default [
  register(DialogCollectionFrame),
  register(DefaultCollectionFrame),
  register(WrappedCollectionFrame),
];
