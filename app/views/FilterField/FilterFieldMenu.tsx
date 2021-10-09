import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import {
  Node,
  SomeTerm,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  SubjectProp,
  registerExotic,
  useFields,
  useIds,
  useLRS,
} from 'link-redux';
import React, { MouseEvent } from 'react';

import MenuItem from '../../components/MenuItem';
import ontola from '../../ontology/ontola';
import { inlineTopology } from '../../topologies/Inline';
import { menuTopology } from '../../topologies/Menu';

interface FilterFieldMenuProps extends SubjectProp {
  handleClose: () => void;
  innerRef: React.Ref<unknown>;
}

interface FilterFieldMenuCompProps extends FilterFieldMenuProps {
  filterKey: SomeTerm;
  innerRef: React.Ref<unknown>;
  options: SomeTerm[];
  partOf: Node;
}

const FilterFieldMenuComp = ({
  filterKey,
  handleClose,
  innerRef,
  options,
  partOf,
  subject,
}: FilterFieldMenuCompProps): JSX.Element => {
  const lrs = useLRS();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: MouseEvent<unknown>) => {
    e.preventDefault();
    setOpen(!open);
  };

  const currentFilter = useIds(partOf, ontola.collectionFilter)
    .find((filter) => lrs.getResourceProperty(filter, ontola.filterKey) === filterKey);
  const currentFilters = currentFilter
    && lrs.getResourceProperties(currentFilter, ontola.filterValue);

  return (
    <React.Fragment>
      <MenuItem
        action={handleClick}
        expandOpen={open}
        ref={innerRef}
        subject={subject}
      >
        <Property
          label={ontola.filterKey}
          topology={inlineTopology}
        />
      </MenuItem>
      <Collapse
        unmountOnExit
        in={open}
        timeout="auto"
      >
        <List
          disablePadding
          component="div"
        >
          {options.map((option) => (
            <Resource
              currentFilters={currentFilters || []}
              filterKey={filterKey}
              handleClose={handleClose}
              key={option.value}
              subject={option}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const FilterFieldMenu = React.forwardRef(
  (props: FilterFieldMenuProps & SubjectProp, ref) => {
    const [filterKey] = useFields(ontola.filterKey);
    const options = useFields(ontola.filterOptions);
    const [partOf] = useIds(schema.isPartOf);

    return(
      <FilterFieldMenuComp
        innerRef={ref}
        {...props}
        filterKey={filterKey}
        options={options}
        partOf={partOf}
      />
    );
  },
);

export default registerExotic(
  FilterFieldMenu,
  ontola.FilterField,
  undefined,
  menuTopology,
);
