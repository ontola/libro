import React, { PropTypes } from 'react';

import './List.scss';

const propTypes = {
  align: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  renderItem: PropTypes.func.isRequired,
};

const defaultProps = {
  align: 'vertical',
};

const hasItems = items => items.length > 0 || items.size > 0;

const loopItems = (items, renderItem) => {
  if (!hasItems(items)) {
    return false;
  }

  return Array.isArray(items)
    ? items.map(renderItem)
    : items.valueSeq().map(renderItem).toArray();
};

const List = ({
  items,
  renderItem,
  align,
}) => (
  <div className={(align === 'horizontal') ? 'List List--horizontal' : 'List'}>
    {loopItems(items, renderItem)}
  </div>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
