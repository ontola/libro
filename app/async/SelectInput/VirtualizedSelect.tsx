import React, {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
} from 'react';
import VirtualList from 'react-tiny-virtual-list';

import Select from '../../topologies/Select';

const ITEM_HEIGHT = 42;
const MIN_ITEM_COUNT = 8;

const listStyle: CSSProperties = {
  overflowX: 'hidden',
  whiteSpace: 'nowrap',
};

const VirtualizedSelect = React.forwardRef<any, HTMLAttributes<HTMLElement>>(
  ({ children, ...otherProps }, ref) => {
    const items = React.useMemo(() => React.Children.toArray(children) as ReactElement[], [children]);
    const itemCount = items.length;
    const renderRow = React.useCallback((props) => {
      const { index, style } = props;

      return React.cloneElement(items[index], {
        className: 'MuiAutocomplete-option',
        style: {
          ...style,
          top: style.top,
        },
      });
    }, [items]);
    const height = Math.min(MIN_ITEM_COUNT, itemCount) * ITEM_HEIGHT;

    return (
      <Select
        {...otherProps}
        innerRef={ref}
      >
        <VirtualList
          height={height}
          itemCount={itemCount}
          itemSize={ITEM_HEIGHT}
          overscanCount={3}
          renderItem={renderRow}
          scrollToAlignment={'auto' as any}
          style={listStyle}
        />
      </Select>
    );
  },
);

export default VirtualizedSelect;
