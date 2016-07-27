import './list.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  renderItem: PropTypes.func.isRequired,
  align: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
};

const defaultProps = {
  items: {},
  align: 'vertical',
};

const List = ({ items, renderItem, align }) => {
  const mapObject = Object.keys(items).map(obj => renderItem(items[obj]));
  const mapArray = items.map(renderItem);
  const renderItems = items === Array ? mapArray : mapObject;
  return (
    <div className={(align === 'horizontal') ? 'List List--horizontal' : 'List'}>
      {renderItems}
    </div>
  );
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
