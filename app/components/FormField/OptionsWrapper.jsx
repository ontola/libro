import rdf from '@ontologies/core';
import {
  Property,
  Resource,
  linkType,
  linkedPropType,
  topologyType,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { arraysEqual, containerToArr } from '../../helpers/data';
import { isPromise } from '../../helpers/types';
import ontola from '../../ontology/ontola';

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
  const [loading, setLoading] = React.useState(false);
  const [debouncedCallback] = useDebouncedCallback(
    () => {
      setLoading((prevValue) => (
        (prevValue === shIn) ? false : !!shIn
      ));
    },
    DEBOUNCE_TIMER
  );

  useDataInvalidation(shIn);
  const [iriTemplate] = useResourceProperty(shInProp, ontola.iriTemplate);

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
  }, [loading, shIn, shIn && lrs.store.changeTimestamps[rdf.id(shIn)]]);

  return (
    <React.Fragment>
      <Component
        iriTemplate={iriTemplate}
        loading={loading}
        options={options}
        topology={topology}
        {...componentProps}
        onOptionsChange={setShIn}
      />
      {
        shIn.termType === 'NamedNode' && (
          <Resource subject={shIn}>
            <Property label={ontola.createAction} />
          </Resource>
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
