import { TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// @ts-ignore
import DateTimePickerComponent from '../../async/DateTimePicker';
import React, { useEffect, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';

import DataType from './DataType';
import { RenderCount } from './helpers';
import useStyles from './useStyles';

interface ObjectProps {
  handleRemove: (objectKey: string, removed: boolean) => void;
  objectKey: string;
}

const ObjectRow = ({ handleRemove, objectKey }: ObjectProps) => {
  const classes = useStyles();
  const [dataType, setDataType] = useState('');
  const [remove, setRemove] = useState(false);

  const add = !remove && objectKey.includes('_on');
  const style = (dirty: boolean) => ({
    backgroundColor: (remove || add || dirty) ? 'lightyellow' : '#f8f8f8',
    textDecoration: remove ? 'line-through' : 'none',
  });

  return (
    <div className={classes.rowWrapper}>
      <Field
        name={objectKey}
        disabled={remove}
        placeholder="Object"
        render={({ input, meta, placeholder }) => {

          return (
            dataType.includes('dateTime')
              ? <DateTimePickerComponent
                onChange={(newValue: any) => input.onChange(newValue)}
                value={input.value}
              />
              : <TextField
                inputProps={{
                  ...input,
                  style: style(!!meta.dirty),
                  type: 'text'
                }}
                onChange={(event) => {
                  // console.log('new value', event.target.value);
                  input.onChange(event.target.value);
                }}
                placeholder={placeholder}
                value={input.value}
                variant="outlined"
              />
          );
        }}
        subscription={{
          dirty: true,
          value: true,
        }}
        type="text"
      />
      <Field
        name={`${objectKey}_dataType`}
        render={({ input, meta }: FieldRenderProps<any>) => {
          useEffect(() => {
            console.log('setDataType', input.value)
            setDataType(input.value);
          }, [input.value]);

          return (
            <DataType
              input={{ ...input }}
              meta={{ ...meta }}
              style={style(!!meta.dirty)}
            />
          );
        }}
        subscription={{
          dirty: true,
          value: true
        }}
      />
      <Field
        name={`${objectKey}_delete`}
        subscription={{ value: true }}
      >
        {({ input: { onChange, value }, ...rest }: FieldRenderProps<any>) => {

          useEffect(() => {
            const _remove = (value === 'check');
            handleRemove(objectKey, _remove)
            setRemove(_remove);
          }, [value]);

          return (
            <ToggleButtonGroup
              exclusive
              onChange={(_, newValue) => onChange(newValue)}
              value={(!!value) ? 'check' : null}
            >
              <ToggleButton value="check" {...rest}>
                <DeleteIcon/>
              </ToggleButton>
            </ToggleButtonGroup>
          );
        }}
      </Field>
      <RenderCount/>
    </div>
  );
};

export default ObjectRow;
