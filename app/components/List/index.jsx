import './list.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  list: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  align: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
};

const defaultProps = {
  list: [],
  align: 'vertical',
};

const List = ({ list, renderItem, align }) => (
  <div className={(align === 'horizontal') ? 'List List--horizontal' : 'List'}>
    {list.map(renderItem)}
  </div>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
