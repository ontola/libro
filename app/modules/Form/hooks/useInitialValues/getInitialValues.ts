import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import form from '../../ontology/form';
import { InputValue } from '../../components/FormField/FormFieldTypes';
import { JSONLDObject, calculateFormFieldName } from '../../lib/helpers';

import { getNestedObjects } from './getNestedObjects';
import { getFormFields, rawFormObjectValue } from './helpers';

type InitialValues = { [index: string]: InputValue[]; };

export const getInitialValues = (
  lrs: LinkReduxLRSType,
  sessionStore: Storage | undefined,
  parentForm: SomeNode,
  object: SomeNode,
  formID: string,
  nested: boolean,
): InitialValues => {
  const values = {} as InitialValues;

  getFormFields(lrs, parentForm).forEach((field) => {
    const value = rawFormObjectValue(lrs, field, object, sessionStore, formID, nested);
    const path = lrs.getResourceProperty<NamedNode>(field, sh.path);

    if (path) {
      const fieldName = calculateFormFieldName(path);
      const nestedForm = lrs.getResourceProperty(field, form.form) as SomeNode;

      if (nestedForm) {
        values[fieldName] = getNestedObjects(lrs, value).map((nestedValue) => {
          const nestedObject = {
            '@id': nestedValue,
            ...getInitialValues(
              lrs,
              sessionStore,
              nestedForm,
              nestedValue,
              formID,
              true,
            ),
          } as JSONLDObject;

          return nestedObject;
        });
      } else {
        if (!Object.keys(values).includes(fieldName)) {
          values[fieldName] = value;
        }
      }
    }
  });

  return values;
};

