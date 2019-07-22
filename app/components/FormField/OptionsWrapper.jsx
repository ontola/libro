import {
  linkType,
  linkedPropType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { arraysEqual, containerToArr } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';
import { isPromise } from '../../helpers/types';

export const optionsType = PropTypes.oneOfType([
  linkedPropType,
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    linkedPropType,
  ])),
]);

const OptionsWrapper = ({
  Component,
  componentProps,
  shIn: shInProp,
}) => {
  const lrs = useLRS();
  const [options, setOptions] = React.useState([]);
  const [shIn, setShIn] = React.useState(shInProp);

  useDataInvalidation({ subject: shIn });
  const searchTemplate = React.useMemo(
    () => lrs.getResourceProperty(shInProp, NS.ontola('searchTemplate')),
    [shInProp]
  );

  const optionsArray = Array.isArray(shIn)
    ? shIn
    : containerToArr(lrs, [], shIn);

  if (Array.isArray(optionsArray) && !arraysEqual(optionsArray, options)) {
    setOptions(optionsArray);
  }

  const loading = options.length === 0 && isPromise(optionsArray);

  return (
    <Component
      loading={loading}
      options={options}
      searchTemplate={searchTemplate}
      {...componentProps}
      onOptionsChange={setShIn}
    />
  );
};

OptionsWrapper.propTypes = {
  Component: PropTypes.elementType,
  componentProps: PropTypes.objectOf(PropTypes.any),
  options: optionsType,
  shIn: linkType,
};

export default OptionsWrapper;
