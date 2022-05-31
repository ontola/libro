import { ClickAwayListener, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Property,
  Resource,
  useIds,
  useValues, 
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { collectionMessages } from '../../translations/messages';
import { useFilterOptions } from '../FilterComboInput/lib/useFilterOptions';

import { useCollectionOptions } from './CollectionContext';
import CollectionCreateButton from './CollectionCreateButton';
import CollectionFilterToggle, { CollectionFilterProps } from './CollectionFilterToggle';

export const HeaderFloat: React.FC<CollectionFilterProps> = ({
  filterContainerRef,
}) => {
  const intl = useIntl();
  const [filterOptions] = useFilterOptions();
  const [sortOptions] = useValues(ontola.sortOptions);
  const [createOptions] = useIds(ontola.createAction);

  const {
    hidePagination,
    originalCollection,
  } = useCollectionOptions();
  const renderPagination = !hidePagination;

  const buttonCount = [
    renderPagination && !!filterOptions,
    renderPagination && !!sortOptions,
    !!createOptions,
  ].filter((value) => value).length;

  if (buttonCount === 0) {
    return null;
  }

  const buttons = (
    <React.Fragment>
      {renderPagination && <CollectionFilterToggle filterContainerRef={filterContainerRef} />}
      {renderPagination && <Property label={ontola.sortOptions} />}
      <Resource subject={originalCollection}>
        <CollectionCreateButton />
      </Resource>
    </React.Fragment>
  );

  if (buttonCount === 1) {
    return buttons;
  }

  const hoverCapable = useMediaQuery('(hover: hover)');
  const [renderButtons, setRenderButtons] = React.useState(false);

  const handleClickAway = React.useCallback(() => {
    setRenderButtons(false);
  }, [setRenderButtons]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span
        onMouseEnter={() => { if (hoverCapable) {
          setRenderButtons(true);
        }}}
        onMouseLeave={() => setRenderButtons(false)}
      >
        {renderButtons && buttons}
        {!renderButtons && (
          <IconButton
            aria-label={intl.formatMessage(collectionMessages.collectionActionsAriaLabel)}
            size="small"
            onClick={() => setRenderButtons(true)}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </span>
    </ClickAwayListener>
  );
};
