// import { TextField } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import rdf, { Quad } from '@ontologies/core';
import { AnyObject } from 'final-form';
import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import useStyles from './useStyles';

export const addObject = (values: AnyObject, predicateKey: string) => {
  const countNewObjects = Object.keys(values)
    .filter((key) => key.includes(`${predicateKey}_on`))
    .length;

  const newObjectKey = `${predicateKey}_on${countNewObjects + 1}`

  values[newObjectKey] = '';
  values[`${newObjectKey}_dataType`] = 'NamedNode';
  values[`${newObjectKey}_delete`] = false;
};

export const addPredicate = (values: AnyObject, predicate: string) => {
  if (predicateExists(values, predicate)) {
    return;
  }
  const countNewPredicates = Object.keys(values)
    .filter((key1) => key1.startsWith(`pn`)).length;
  const key = `pn${countNewPredicates + 1}`;
  values[key] = predicate;
  addObject(values, key);
};

export const cloneQuad = (s: Quad): Quad => ({
  subject: { ...s.subject },
  predicate: { ...s.predicate },
  object: { ...s.object },
  graph: s.graph ? { ...s.graph } : rdf.defaultGraph(),
});

export const getKeys = (quad: Quad) => {
  const predicateKey = `p${quad.predicate.id}`;
  const objectKey = `${predicateKey}_o${quad.object.id}`;
  return {
    dataTypeKey: `${objectKey}_dataType`,
    deleteKey: `${objectKey}_delete`,
    newObjectKey: `${predicateKey}_newObject`,
    objectKey,
    predicateKey,
  };
};

export const getObjectValues = (values: AnyObject, objectKey: string) => ({
  dataType: values[`${objectKey}_dataType`],
  predicate: values[getPredicateKey(objectKey)],
  remove: values[`${objectKey}_delete`] === 'check',
  value: values[objectKey],
});

export const getObjectKeys = (values: AnyObject, predicateKey: string) => (
  Object
    .keys(values)
    .filter((key) => key.includes(`${predicateKey}_o`) && !key.includes(`_delete`) && !key.includes(`_dataType`))
);

export const getPredicateKey = (key: string) => (
  key.substring(0, key.indexOf('_'))
);

export const getPredicateKeys = (values: AnyObject) => (
  Object
    .keys(values)
    .filter((key) => !key.includes('_') && key.startsWith('p'))
    .sort((pred1, pred2) => values[pred1] < values[pred2] ? -1 : 1)
);

export const isNewObjectKey = (key: string) => (
  key.includes('_on') && !key.includes('_dataType') && !key.includes('_delete')
);

export const isNewPredicateKey = (key: string) => (
  !key.includes('_') && key.startsWith('pn')
);

export const predicateExists = (values: AnyObject, predicate: string) => (
  Object.entries(values)
    .findIndex(([key, value]) => (
      key.startsWith('p') && !key.includes('_') && value === predicate
    )) > -1
);

export const LabelAdapter = ({ input: { value }, ...rest }: FieldRenderProps<any>) => (
  <label {...rest}>{value}</label>
);

// export const TextFieldAdapter = ({ input, meta, ...rest }: FieldRenderProps<any>) => (
//   <TextField
//     inputProps={rest}
//     onChange={(event) => input.onChange(event.target.value)}
//     variant="outlined"
//   />
// );

export const ToggleButtonAdapter = ({ input: { onChange, value }, children, ...rest }: FieldRenderProps<any>) => (
  <ToggleButtonGroup
    exclusive
    onChange={(_, newValue) => onChange(newValue)}
    value={(!!value) ? 'check' : null}
  >
    <ToggleButton value="check" {...rest}>
      {children}
    </ToggleButton>
  </ToggleButtonGroup>
);

export const RenderCount = () => {
  const classes = useStyles();
  const renders = React.useRef(0);

  return <i className={classes.renderCount}>{++renders.current}</i>;
};
