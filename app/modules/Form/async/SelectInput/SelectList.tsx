import React, { HTMLAttributes } from 'react';

import Select from '../../topologies/Select';

const SelectList = React.forwardRef<any, HTMLAttributes<HTMLElement>>(
  ({ children, ...otherProps }, ref) => (
    <Select
      {...otherProps}
      innerRef={ref}
    >
      {children}
    </Select>
  ),
);

SelectList.displayName = 'SelectList';

export default SelectList;
