import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  subjectType,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import MenuItem from '../../components/MenuItem';
import ontola from '../../ontology/ontola';
import { inlineTopology } from '../../topologies/Inline';
import { menuTopology } from '../../topologies/Menu';

const FilterFieldMenuComp = ({
  filterKey,
  handleClose,
  innerRef,
  options,
  partOf,
  subject,
}) => {
  const lrs = useLRS();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const currentFilter = useResourceProperty(partOf, ontola.collectionFilter)
    .filter(isNode)
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
              key={option}
              subject={option}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const FilterFieldMenu = React.forwardRef(
  (props, ref) => {
    const [filterKey] = useProperty(ontola.filterKey);
    const options = useProperty(ontola.filterOptions);
    const [partOf] = useProperty(schema.isPartOf);

    return(
      <FilterFieldMenuComp
        innerRef={ref}
        {...props}
        filterKey={filterKey}
        options={options}
        partOf={partOf}
      />
    )
  }
);

FilterFieldMenu.type = ontola.FilterField;

FilterFieldMenu.topology = menuTopology;

FilterFieldMenuComp.propTypes = {
  filterKey: linkType,
  handleClose: PropTypes.func,
  innerRef: PropTypes.func,
  options: PropTypes.arrayOf(linkType),
  partOf: linkType,
  subject: subjectType,
};

export default register(FilterFieldMenu);
