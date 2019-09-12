import {
  LinkedResourceContainer,
  Property,
  linkType,
  linkedPropType,
  topologyType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { arraysEqual, containerToArr } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';
import { isPromise } from '../../helpers/types';

const DEBOUNCE_TIMER = 1000;

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
  topology,
}) => {
  const lrs = useLRS();
  const [options, setOptions] = React.useState([]);
  const [shIn, setShIn] = React.useState(shInProp);
  const [loading, setLoading] = React.useState(null);
  const [debouncedCallback] = useDebouncedCallback(
    () => {
      setLoading(prevValue => (
        (prevValue === shIn) ? null : shIn
      ));
    },
    DEBOUNCE_TIMER
  );

  useDataInvalidation({ subject: shIn });
  const searchTemplate = React.useMemo(
    () => lrs.getResourceProperty(shInProp, NS.ontola('searchTemplate')),
    [shInProp]
  );

  React.useLayoutEffect(() => {
    if (loading) {
      return;
    }
    const optionsArray = Array.isArray(shIn)
      ? shIn
      : containerToArr(lrs, [], shIn);

    if (Array.isArray(optionsArray) && !arraysEqual(optionsArray, options)) {
      setOptions(optionsArray);
    } else if (isPromise(optionsArray)) {
      if (!loading) {
        setLoading(shIn);
        optionsArray.then(debouncedCallback);
      }
    }
  }, [loading, shIn, shIn && lrs.store.changeTimestamps[shIn.sI]]);

  return (
    <React.Fragment>
      <Component
        loading={loading}
        options={options}
        searchTemplate={searchTemplate}
        topology={topology}
        {...componentProps}
        onOptionsChange={setShIn}
      />
      {
        shIn.termType === 'NamedNode' && (
          <LinkedResourceContainer subject={shIn}>
            <Property label={NS.ontola('createAction')} />
          </LinkedResourceContainer>
        )
      }
    </React.Fragment>
  );
};

OptionsWrapper.propTypes = {
  Component: PropTypes.elementType,
  componentProps: PropTypes.objectOf(PropTypes.any),
  options: optionsType,
  shIn: linkType,
  topology: topologyType,
};

export default OptionsWrapper;
