import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';

import { FileStore, StoreFile } from '../../hooks/useFileStore';
import { SubmissionErrors } from '../FormField/FormFieldTypes';

export enum FormTheme {
  Default = 'default',
  Flow = 'flow',
  Preview = 'preview',
}

export interface FormContext {
  autofocusForm: boolean;
  blacklist?: number[];
  fileStore: FileStore;
  formID: string;
  formIRI: SomeNode;
  formSection?: string;
  object?: SomeNode;
  onKeyUp?: EventHandler<any>;
  parentObject?: SomeNode;
  sessionStore?: Storage;
  submissionErrors?: SubmissionErrors;
  storeFile?: StoreFile;
  submitting?: boolean;
  theme?: FormTheme;
  whitelist?: number[];
}

export const formContext = React.createContext<Partial<FormContext>>({});
