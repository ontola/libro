import {
  ClickAwayListener,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import clsx from 'clsx';
import { Property, Resource } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { collectionMessages } from '../../translations/messages';

import { useCollectionOptions } from './CollectionContext';
import CollectionCreateButton from './CollectionCreateButton';
import CollectionFilterToggle, { CollectionFilterProps } from './CollectionFilterToggle';

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
    hidePagination,
    originalCollection,
  } = useCollectionOptions();
  const renderPagination = !hidePagination;
  const theme = useTheme();
  const screenIsWide = useMediaQuery(theme.breakpoints.up('md'));

  const [renderButtons, setRenderButtons] = React.useState(false);

  const handleClickAway = React.useCallback(() => {
    setRenderButtons(false);
  }, [setRenderButtons]);

  const showButtons = screenIsWide || renderButtons;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span className={clsx(CollectionHeaderFloatCID, classes.headerFloat)}>
        {showButtons && (
          <React.Fragment>
            {renderPagination && <CollectionFilterToggle filterContainerRef={filterContainerRef} />}
            {renderPagination && <Property label={ontola.sortOptions} />}
            <Resource subject={originalCollection}>
              <CollectionCreateButton />
            </Resource>
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
