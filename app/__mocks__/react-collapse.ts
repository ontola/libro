/**
 * The `ReactCollapse` module uses a lot of DOM API's (e.g. `clientHeight`) which are not compatible
 * with the snapshot testing system. We also avoid the need of mounting the collapsible reducer by
 * always rendering the children.
 * @module ReactCollapse
 */

import React from 'react';

export const Collapse = ({ children }: { children: React.ReactNode }): JSX.Element =>
  React.createElement('div', null, children);

export default Collapse;
