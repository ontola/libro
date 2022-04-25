import {
  NamedNode,
  SomeTerm,
  isNode,
} from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib/dist-types/types';
import { LinkReduxLRSType } from 'link-redux';

import { conditionalFormFieldsPath, formFieldsPath } from '../../../../helpers/diggers';
import { inputValueFromStorage } from '../../../../helpers/persistence';
import form from '../../../../ontology/form';

export const getFormFields = (lrs: LinkReduxLRSType, actionBody: SomeNode): SomeNode[] =>
  (lrs.dig(actionBody, formFieldsPath).concat(lrs.dig(actionBody, conditionalFormFieldsPath))).filter(isNode);

export const rawFormObjectValue = (lrs: LinkReduxLRSType, field: SomeNode, object: SomeNode, sessionStore: Storage | undefined, formID: string, nested: boolean): SomeTerm[] => {
  const path = lrs.getResourceProperty<NamedNode>(field, sh.path);

  if (!path) {
    return [];
  }

  const defaultValue = lrs.getResourceProperties(field, form.defaultValue);
  const valueFromStorage = inputValueFromStorage(sessionStore, path, object, formID, nested);

  if (valueFromStorage) {
    return valueFromStorage;
  }

  return defaultValue.length > 0 ? defaultValue : lrs.getResourceProperties(object, path);
};
