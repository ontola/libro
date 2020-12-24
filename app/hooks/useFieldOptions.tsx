import rdf, { isNamedNode, isNode } from '@ontologies/core';
import sh from '@ontologies/shacl';
import { SomeTerm } from 'link-lib/dist-types/rdf';
import {
  linkedPropType,
  Property,
  Resource,
  useDataInvalidation,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import parser from 'uri-template';
import { useDebouncedCallback } from 'use-debounce';

import {
  arraysEqual,
  containerToArr,
  entityIsLoaded,
} from '../helpers/data';
import { isPromise } from '../helpers/types';
import ontola from '../ontology/ontola';

const DEBOUNCE_TIMER = 1000;

export const optionsType = PropTypes.oneOfType([
  linkedPropType,
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    linkedPropType,
  ])),
]);

const useFieldOptions = () => {
  const [shInProp] = useProperty(sh.in);
  const lrs = useLRS();
  const [options, setOptions] = React.useState(([] as SomeTerm[]));
  const [shIn, setShIn] = React.useState(shInProp);
  const [loading, setLoading] = React.useState(false);
  const [debouncedCallback] = useDebouncedCallback(
    () => {
      setLoading((prevValue) => (
        (prevValue === !!shIn) ? false : !!shIn
      ));
    },
    DEBOUNCE_TIMER,
  );

  useDataInvalidation([shIn, ...options].filter(isNamedNode));
  const [iriTemplate] = useResourceProperty(isNamedNode(shInProp) ? shInProp : undefined, ontola.iriTemplate);
  const searchTemplate = iriTemplate && parser.parse(iriTemplate.value);
  const searchable = searchTemplate?.expressions?.some((expr) => (
    expr.params.map((param) => param.name).includes('q')
  ));

  React.useLayoutEffect(() => {
    if (loading) {
      return;
    }
    const optionsArray = Array.isArray(shIn)
      ? shIn
      : containerToArr(lrs, [], isNode(shIn) ? shIn : []);

    if (Array.isArray(optionsArray) && !arraysEqual(optionsArray, options)) {
      setOptions(optionsArray);
    } else if (isPromise(optionsArray)) {
      if (!loading) {
        setLoading(!!shIn);
        optionsArray.then(debouncedCallback);
      }
    }
  }, [loading, shIn, shIn && lrs.store.changeTimestamps[rdf.id(shIn)]]);

  const renderCreateButton = () => (
    isNamedNode(shIn) && entityIsLoaded(lrs, shIn) && (
      <Resource subject={shIn}>
        <Property label={ontola.createAction} limit={Infinity} />
      </Resource>
    )
  );

  return {
    iriTemplate: searchable && iriTemplate,
    loading,
    options,
    renderCreateButton,
    setShIn,
  };
};

export default useFieldOptions;
