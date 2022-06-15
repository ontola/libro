import {
  Badge,
  Collapse,
  IconButton,
  Portal,
} from '@mui/material';
import { useLinkRenderContext } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { collectionMessages } from '../../../translations/messages';

import { useCollectionOptions } from './CollectionContext';
import { FilterComboInput } from './FilterComboInput';
import { useActiveValues } from './FilterComboInput/lib/useActiveValues';
import { useFilterOptions } from './FilterComboInput/lib/useFilterOptions';

const FILTER_TRANSITION_LENGTH = 100;

export interface CollectionFilterProps {
  filterContainerRef: React.MutableRefObject<null>;
}

const CollectionFilterToggle = ({
  filterContainerRef,
}: CollectionFilterProps): JSX.Element | null => {
  const intl = useIntl();
  const { subject } = useLinkRenderContext();
  const { redirectPagination } = useCollectionOptions();

  const filterValues = useFilterOptions();
  const [activeValues, hiddenActiveValues] = useActiveValues(filterValues);

  const [filterBarState, toggleFilterBar] = React.useState<{
    focus: boolean,
    show: boolean,
  }>({
    focus: false,
    show: !!redirectPagination && activeValues.length > 0,
  });
  const handleClick = React.useCallback(() => {
    toggleFilterBar({
      focus: true,
      show: !filterBarState.show,
    });
  }, [toggleFilterBar, filterBarState.show]);
  const [showPortal, setShowPortal] = React.useState<boolean>(!!filterContainerRef?.current);
  React.useEffect(() => {
    setShowPortal(!!filterContainerRef?.current);
  }, [filterContainerRef?.current]);

  if (filterValues.length == 0) {
    return null;
  }

  return (
    <React.Fragment>
      {showPortal ? (
        <Portal container={filterContainerRef.current}>
          <Collapse
            in={filterBarState.show}
            timeout={FILTER_TRANSITION_LENGTH}
          >
            <FilterComboInput
              activeValues={activeValues}
              autoFocus={filterBarState.focus}
              filterValues={filterValues}
              hiddenActiveValues={hiddenActiveValues}
              partOf={subject}
              shown={filterBarState.show}
              transitionTime={FILTER_TRANSITION_LENGTH}
            />
          </Collapse>
        </Portal>
      ) : null}
      <Badge
        badgeContent=" "
        color="secondary"
        invisible={filterBarState.show || activeValues.length == 0}
        overlap="circular"
        variant="dot"
      >
        <IconButton
          size="small"
          title={intl.formatMessage(collectionMessages.filter)}
          onClick={handleClick}
        >
          <FontAwesome name="filter" />
        </IconButton>
      </Badge>
    </React.Fragment>
  );
};

export default CollectionFilterToggle;
