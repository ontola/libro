import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Portal from '@material-ui/core/Portal';
import { useIds, useLinkRenderContext } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { useSeqToArr } from '../../hooks/useSeqToArr';
import ontola from '../../ontology/ontola';
import { collectionMessages } from '../../translations/messages';
import { FilterComboInput } from '../FilterComboInput';

import { useCollectionOptions } from './CollectionProvider';

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

  const filters = useIds(ontola.collectionFilter);
  const [fieldSequence] = useIds(ontola.filterFields);
  const [filterFields] = useSeqToArr(fieldSequence);

  const [filterBarState, toggleFilterBar] = React.useState<{
    focus: boolean,
    show: boolean,
  }>({
    focus: false,
    show: !!redirectPagination && filters.length > 0,
  });

  const handleClick = () => {
    toggleFilterBar({
      focus: true,
      show: !filterBarState.show,
    });
  };

  if (filterFields.length == 0) {
    return null;
  }

  const [showPortal, setShowPortal] = React.useState<boolean>(!!filterContainerRef.current);
  React.useEffect(() => {
    setShowPortal(!!filterContainerRef.current);
  }, [filterContainerRef.current]);

  return (
    <React.Fragment>
      {showPortal ? (
        <Portal container={filterContainerRef.current}>
          <Collapse
            in={filterBarState.show}
            timeout={FILTER_TRANSITION_LENGTH}
          >
            <FilterComboInput
              autoFocus={filterBarState.focus}
              currentFilters={filters}
              filters={filterFields}
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
        invisible={filterBarState.show || filters.length == 0}
        overlap="circle"
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
