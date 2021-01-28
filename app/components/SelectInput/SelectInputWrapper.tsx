import { isNamedNode, Term } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { SomeTerm } from 'link-lib/dist-types/rdf';
import {
  LinkReduxLRSType,
  Resource,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import parser from 'uri-template';
import { useDebouncedCallback } from 'use-debounce';

import { entityIsLoaded } from '../../helpers/data';
import normalizedLower from '../../helpers/i18n';
import { isResource } from '../../helpers/types';
import { iriFromTemplate } from '../../helpers/uriTemplate';
import useFieldOptions from '../../hooks/useFieldOptions';
import { InputValue } from '../../hooks/useFormField';
import ontola from '../../ontology/ontola';
import CollectionCreateActionButton from '../Collection/CollectionCreateActionButton';
import { InputComponentProps } from '../FormField/FormInputs';
import { LoadingRow } from '../Loading';

import SelectInputField from './SelectInputField';

const DEBOUNCE_TIMER = 500;

const messages = defineMessages({
  noMatchingItems: {
    defaultMessage: 'No matching items',
    id: 'https://app.argu.co/i18n/forms/select/noMatchingItems',
  },
  typeToSearch: {
    defaultMessage: 'Type to start searching',
    id: 'https://app.argu.co/i18n/forms/select/typeToSearch',
  },
});

function filterOptions(
  itemToString: (item: SomeTerm | undefined) => string,
  currentValue: string,
  selectedItem: InputValue,
  options: SomeTerm[],
  iriTemplate: Term | undefined,
) {
  if (iriTemplate) {
    return options;
  }

  const compareValue = currentValue && normalizedLower(currentValue);

  if (compareValue && (!isNamedNode(selectedItem) || itemToString(selectedItem) !== currentValue)) {
    return options
      .filter((item) => (
        normalizedLower(item.value).includes(compareValue)
          || normalizedLower(itemToString(item)).includes(compareValue)
      ));
  }

  return options;
}

function emptyText(fm: (args: any) => string, iriTemplate: Term | undefined, currentValue: string) {
  if (iriTemplate) {
    if (currentValue && currentValue.length > 0) {
      return fm(messages.noMatchingItems);
    }

    return fm(messages.typeToSearch);
  }

  return fm(messages.noMatchingItems);
}

const iriTemplateFromCollection = (lrs: LinkReduxLRSType, shIn: SomeNode) => {
  const [template] = shIn && lrs.dig(shIn, [ontola.baseCollection, ontola.iriTemplate]);
  const searchTemplate = template && parser.parse(template.value);
  const searchable = searchTemplate?.expressions?.some((expr) => (
    expr.params.map((param) => param.name).includes('q')
  ));

  return searchable ? template : undefined;
};

const SelectInputWrapper: React.FC<InputComponentProps> = ({
  fieldShape,
  inputValue,
  name,
  onChange,
}) => {
  const { formatMessage } = useIntl();
  const lrs = useLRS();
  const itemToString = React.useCallback((item: SomeTerm | undefined | null) => {
    if (typeof item === 'undefined' || item === null) {
      return '';
    }

    if (isResource(item)) {
      if (!entityIsLoaded(lrs, item)) {
        return 'Loading';
      }

      const itemClass = lrs.getResourceProperty(item, rdfx.type);
      const classDisplayProp = (
        isNamedNode(itemClass) && lrs.getResourceProperty(itemClass, ontola.ns('forms/inputs/select/displayProp'))
      ) || schema.name;
      let label = isNamedNode(classDisplayProp) && lrs.getResourceProperty(item, classDisplayProp);
      if (!label) {
        label = lrs.getResourceProperty(item, schema.name);
      }

      return label ? label.value : item.value;
    }

    return item.value;
  }, [lrs]);
  const shInProp = fieldShape.shIn as SomeNode | undefined;
  const [shIn, setShIn] = React.useState(shInProp);
  const iriTemplate = shInProp && iriTemplateFromCollection(lrs, shInProp);
  const { loading, options } = useFieldOptions(shIn);

  const [currentValue, setCurrentValue] = React.useState('');
  const [itemsToShow, setItemsToShow] = React.useState<SomeTerm[]>([]);
  React.useEffect(() => {
    setItemsToShow(filterOptions(itemToString, currentValue, inputValue, options, iriTemplate));
  }, [loading, currentValue, options]);
  const [handleInputValueChange] = useDebouncedCallback(
    (newValue) => {
      if (iriTemplate && (!isNamedNode(inputValue) || itemToString(inputValue) !== newValue)) {
        const compareValue = newValue && normalizedLower(newValue);
        const searchResultOpts = {} as any;
        if (compareValue?.length > 0) {
          searchResultOpts.match = 'partial';
          searchResultOpts.page = 1;
          searchResultOpts.q = compareValue;
          searchResultOpts.fragment = 'members';
        }
        const searchResult = iriFromTemplate(iriTemplate.value, searchResultOpts);
        setShIn(searchResult);
      }

      setCurrentValue(newValue);
    },
    iriTemplate ? DEBOUNCE_TIMER : 0,
    { leading: true }
    ,
  );
  useDataInvalidation(options.filter(isResource));
  const handleChange = React.useCallback((v) => {
    setShIn(shInProp);
    onChange(v);
    setCurrentValue('');
  }, [onChange]);

  const initialSelectedItem = isNamedNode(inputValue) ? inputValue : undefined;

  if (__CLIENT__ && isNamedNode(initialSelectedItem) && !entityIsLoaded(lrs, initialSelectedItem)) {
    lrs.queueEntity(initialSelectedItem);

    return <LoadingRow />;
  }

  return (
    <div className="Field__input Field__input--select">
      <SelectInputField
        emptyText={emptyText(formatMessage, iriTemplate, currentValue)}
        initialSelectedItem={initialSelectedItem}
        itemToString={itemToString}
        items={itemsToShow}
        loading={loading}
        name={name}
        required={fieldShape.required}
        onChange={handleChange}
        onInputValueChange={handleInputValueChange}
      />
      <Resource subject={shInProp} onLoad={() => null}>
        <CollectionCreateActionButton />
      </Resource>
    </div>
  );
};

export default SelectInputWrapper;
