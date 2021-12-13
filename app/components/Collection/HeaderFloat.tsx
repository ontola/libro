import {
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { Property, Resource } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { collectionMessages } from '../../translations/messages';

import CollectionCreateActionButton from './CollectionCreateActionButton';
import CollectionFilterToggle, { CollectionFilterProps } from './CollectionFilterToggle';
import { useCollectionOptions } from './CollectionProvider';

export const CollectionHeaderFloatCID = 'CID-CollectionHeaderFloat';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  headerFloat: {
    [theme.breakpoints.up('md')]: {
      opacity: 0,
      transition: 'opacity 150ms ease',
    },
  },
}));

export const HeaderFloat = ({
  filterContainerRef,
}: CollectionFilterProps): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  const {
    headerButtons,
    hidePagination,
    originalCollection,
  } = useCollectionOptions();
  const renderPagination = !hidePagination;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [renderButtons, setRenderButtons] = React.useState(false);

  const handleClickAway = React.useCallback(() => {
    setRenderButtons(false);
  }, [setRenderButtons]);

  const showButtons = isDesktop || renderButtons;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span className={clsx(CollectionHeaderFloatCID, classes.headerFloat)}>
        {showButtons && (
          <React.Fragment>
            {renderPagination && <CollectionFilterToggle filterContainerRef={filterContainerRef} />}
            {renderPagination && <Property label={ontola.sortOptions} />}
            <Resource subject={originalCollection}>
              <CollectionCreateActionButton />
            </Resource>
            {headerButtons}
          </React.Fragment>
        )}
        {!showButtons && (
          <IconButton
            aria-label={intl.formatMessage(collectionMessages.collectionActionsAriaLabel)}
            size="small"
            onClick={() => setRenderButtons(true)}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </span>
    </ClickAwayListener>
  );
};
