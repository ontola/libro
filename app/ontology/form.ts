import { createNS } from '@ontologies/core';

const form = createNS('https://ns.ontola.io/form#');

export default {
  ns: form,

  /* classes */
  // eslint-disable-next-line sort-keys
  AssociationInput: form('AssociationInput'),
  CheckboxGroup: form('CheckboxGroup'),
  CheckboxInput: form('CheckboxInput'),
  CollapsibleGroup: form('CollapsibleGroup'),
  ColorInput: form('ColorInput'),
  DateInput: form('DateInput'),
  DateTimeInput: form('DateTimeInput'),
  EmailInput: form('EmailInput'),
  Field: form('Field'),
  FileInput: form('FileInput'),
  FooterGroup: form('FooterGroup'),
  Form: form('Form'),
  Group: form('Group'),
  HiddenGroup: form('HiddenGroup'),
  LocationInput: form('LocationInput'),
  MarkdownInput: form('MarkdownInput'),
  MoneyInput: form('MoneyInput'),
  NumberInput: form('NumberInput'),
  Page: form('Page'),
  PasswordInput: form('PasswordInput'),
  PostalRangeInput: form('PostalRangeInput'),
  RadioGroup: form('RadioGroup'),
  ResourceField: form('ResourceField'),
  SelectInput: form('SelectInput'),
  SliderInput: form('SliderInput'),
  TextAreaInput: form('TextAreaInput'),
  TextInput: form('TextInput'),
  ToggleButtonGroup: form('ToggleButtonGroup'),

  /* properties */
  fields: form('fields'),
  footerGroup: form('footerGroup'),
  form: form('form'),
  groupedOptions: form('groupedOptions'),
  groups: form('groups'),
  hidden: form('hidden'),
  pages: form('pages'),
};
