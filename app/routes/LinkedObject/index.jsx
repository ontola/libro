import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { currentLocation } from '../../helpers/paths';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const wildcardMap = new Map();
wildcardMap.set('/media_objects/', ['page']);

const LinkedObject = ({ location }) => {
  let routedLocation = location;

  for (const pathMatch of wildcardMap.keys()) {
    if (typeof pathMatch === 'string') {
      if (location.pathname.startsWith(pathMatch)) {
        const search = new URLSearchParams(location.search);
        wildcardMap.get(pathMatch).forEach(v => search.delete(v));

        routedLocation = {
          ...location,
          search: search.toString() ? `?${search.toString()}` : '',
        };
        break;
      }
    }
  }

  return (
    <LinkedResourceContainer subject={currentLocation(routedLocation)} />
  );
};

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
export { default as LinkPage } from './LinkPage';
