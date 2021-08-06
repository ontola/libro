import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Portal from '@material-ui/core/Portal';
import { isNode } from '@ontologies/core';
import { useLinkRenderContext, useProperty } from 'link-redux';
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
  const {
    appliedFilters,
    redirectPagination,
  } = useCollectionOptions();

  const autoShowFilters = redirectPagination || appliedFilters.length > 0;

  const currentFilters = useProperty(ontola.collectionFilter).filter(isNode);
  const [filterSequence] = useProperty(ontola.filterFields).filter(isNode);
  const [filters] = useSeqToArr(filterSequence);
  const [showFilters, setShowFilters] = React.useState<{
    show: boolean,
    userAction: boolean,
  }>({
    show: !!autoShowFilters,
    userAction: false,
  });

  const hasUserSetFilters = (autoShowFilters ? currentFilters : appliedFilters).length > 0;

  const handleClick = () => {
    setShowFilters({
      show: !showFilters.show,
      userAction: true,
    });
  };

  if (filters.length == 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Portal container={filterContainerRef.current}>
        <Collapse
          in={showFilters.show}
          timeout={FILTER_TRANSITION_LENGTH}
        >
          <FilterComboInput
            autoFocus={showFilters.userAction}
            currentFilters={currentFilters}
            filters={filters}
            partOf={subject}
            shown={showFilters.show}
            transitionTime={FILTER_TRANSITION_LENGTH}
          />
        </Collapse>
      </Portal>
      <Badge
        badgeContent=" "
        color="secondary"
        invisible={showFilters.show || !hasUserSetFilters}
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
