import * as schema from '@ontologies/schema';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ClickAwayListener, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Property,
  Resource,
  useGlobalIds,
  useValues,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { collectionMessages } from '../../../translations/messages';
import ontola from '../../Kernel/ontology/ontola';

import { useCollectionOptions } from './CollectionContext';
import CollectionCreateButton, { TriggerType } from './CollectionCreateButton';
import CollectionFilterToggle, { CollectionFilterProps } from './CollectionFilterToggle';
import { useFilterOptions } from './FilterComboInput/lib/useFilterOptions';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
}));

export const HeaderFloat: React.FC<CollectionFilterProps> = ({
  filterContainerRef,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const [filterOptions] = useFilterOptions();
  const [sortOptions] = useValues(ontola.sortOptions);
  const [downloadUrl] = useGlobalIds(schema.downloadUrl);

  const {
    hidePagination,
    originalCollection,
  } = useCollectionOptions();
  const renderPagination = !hidePagination;

  const [renderButtons, setRenderButtons] = React.useState(false);

  const handleClickAway = React.useCallback(() => {
    setRenderButtons(false);
  }, [setRenderButtons]);

  const buttonCount = [
    renderPagination && !!downloadUrl,
    renderPagination && !!filterOptions,
    renderPagination && !!sortOptions,
  ].filter((value) => value).length;

  if (buttonCount === 0) {
    return (
      <Resource subject={originalCollection}>
        <CollectionCreateButton trigger={TriggerType.TextWithIcon} />
      </Resource>
    );
  }

  const buttons = (
    <React.Fragment>
      {renderPagination && <CollectionFilterToggle filterContainerRef={filterContainerRef} />}
      {renderPagination && <Property label={ontola.sortOptions} />}
      {downloadUrl && <Property label={schema.downloadUrl} />}
    </React.Fragment>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span className={classes.wrapper}>
        <Resource subject={originalCollection}>
          <CollectionCreateButton trigger={TriggerType.TextWithIcon} />
        </Resource>
        {(buttonCount === 1) ? buttons : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </span>
    </ClickAwayListener>
  );
};
