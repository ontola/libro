import './list.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  list: PropTypes.array.isRequired,
  RenderItem: PropTypes.node.isRequired,
};

const defaultProps = {
  list: [],
  RenderItem: '',
};

const List = ({ list, RenderItem }) => {
  list.map((listItem, i) => <RenderItem key={i} data={listItem} />);
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
