import { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import { quadruple } from '../../Kernel/lib/quadruple';
import ontola from '../../Kernel/ontology/ontola';
import form from '../ontology/form';

export const seed: Quadruple[] = [
  quadruple(schema.Thing, ontola['forms/inputs/select/displayProp'], schema.name),

  quadruple(form.CollapsibleGroup, rdfx.type, rdfs.Class),
  quadruple(form.CollapsibleGroup, rdfs.subClassOf, form.Group),
  quadruple(form.FooterGroup, rdfx.type, rdfs.Class),
  quadruple(form.FooterGroup, rdfs.subClassOf, form.Group),
  quadruple(form.HiddenGroup, rdfx.type, rdfs.Class),
  quadruple(form.HiddenGroup, rdfs.subClassOf, form.Group),

  quadruple(form.CheckboxGroup, rdfx.type, rdfs.Class),
  quadruple(form.CheckboxGroup, rdfs.subClassOf, form.Field),
  quadruple(form.CheckboxInput, rdfx.type, rdfs.Class),
  quadruple(form.CheckboxInput, rdfs.subClassOf, form.Field),
  quadruple(form.ColorInput, rdfx.type, rdfs.Class),
  quadruple(form.ColorInput, rdfs.subClassOf, form.Field),
  quadruple(form.DateInput, rdfx.type, rdfs.Class),
  quadruple(form.DateInput, rdfs.subClassOf, form.Field),
  quadruple(form.DateTimeInput, rdfx.type, rdfs.Class),
  quadruple(form.DateTimeInput, rdfs.subClassOf, form.Field),
  quadruple(form.EmailInput, rdfx.type, rdfs.Class),
  quadruple(form.EmailInput, rdfs.subClassOf, form.Field),
  quadruple(form.FileInput, rdfx.type, rdfs.Class),
  quadruple(form.FileInput, rdfs.subClassOf, form.Field),
  quadruple(form.LocationInput, rdfx.type, rdfs.Class),
  quadruple(form.LocationInput, rdfs.subClassOf, form.Field),
  quadruple(form.MarkdownInput, rdfx.type, rdfs.Class),
  quadruple(form.MarkdownInput, rdfs.subClassOf, form.Field),
  quadruple(form.NumberInput, rdfx.type, rdfs.Class),
  quadruple(form.NumberInput, rdfs.subClassOf, form.Field),
  quadruple(form.PasswordInput, rdfx.type, rdfs.Class),
  quadruple(form.PasswordInput, rdfs.subClassOf, form.Field),
  quadruple(form.PostalRangeInput, rdfx.type, rdfs.Class),
  quadruple(form.PostalRangeInput, rdfs.subClassOf, form.Field),
  quadruple(form.RadioGroup, rdfx.type, rdfs.Class),
  quadruple(form.RadioGroup, rdfs.subClassOf, form.Field),
  quadruple(form.SelectInput, rdfx.type, rdfs.Class),
  quadruple(form.SelectInput, rdfs.subClassOf, form.Field),
  quadruple(form.SliderInput, rdfx.type, rdfs.Class),
  quadruple(form.SliderInput, rdfs.subClassOf, form.Field),
  quadruple(form.TextAreaInput, rdfx.type, rdfs.Class),
  quadruple(form.TextAreaInput, rdfs.subClassOf, form.Field),
  quadruple(form.ToggleButtonGroup, rdfx.type, rdfs.Class),
  quadruple(form.ToggleButtonGroup, rdfs.subClassOf, form.Field),
  quadruple(form.MultipleEmailInput, rdfx.type, rdfs.Class),
  quadruple(form.MultipleEmailInput, rdfs.subClassOf, form.Field),
  quadruple(form.TextInput, rdfx.type, rdfs.Class),
  quadruple(form.TextInput, rdfs.subClassOf, form.Field),
  quadruple(form.SwipeInput, rdfx.type, rdfs.Class),
  quadruple(form.SwipeInput, rdfs.subClassOf, form.Field),

];
