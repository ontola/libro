import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';

// @ts-ignore
import DateTimePickerComponent from '../../async/DateTimePicker';
import DataType from './DataType';
import { getLastPart } from './helpers';
import useStyles from './useStyles';

interface ObjectRowProps {
  handleAddObject: () => void;
  handleRemoveObject: (objectKey: string, removed: boolean) => void;
  index: number;
  objectKey: string;
  predicateKey: string;
  removePredicate: boolean;
}

const ObjectRow = ({
  handleAddObject,
  handleRemoveObject,
  index,
  objectKey,
  predicateKey,
  removePredicate,
}: ObjectRowProps) => {
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
      {index > 0
        ? <div className={classes.predicateLabel}>&nbsp;</div>
        : <Field
          name={predicateKey}
          render={({ input }: FieldRenderProps<any>) => (
            <label
              className={classes.predicateLabel}
              style={{
                textDecoration: removePredicate ? 'line-through' : 'none',
              }}
            >
              {getLastPart(input.value)}
            </label>
          )}
          subscription={{ value: true }}
        />
      }
      <Field
        name={`${objectKey}_dataType`}
        render={({ input, meta }: FieldRenderProps<any>) => {
          useEffect(() => (
            setDataType(input.value)
          ), [input.value]);

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
          value: true,
        }}
      />
      <Field
        name={objectKey}
        disabled={remove}
        placeholder="Object"
        render={({ input, meta, placeholder }) => (
          dataType.includes('dateTime')
            ? <DateTimePickerComponent
              onChange={(newValue: any) => input.onChange(newValue)}
              value={input.value}
            />
            : <TextField
              inputProps={{
                ...input,
                style: style(!!meta.dirty),
                type: 'text',
              }}
              onChange={(event) => (
                input.onChange(event.target.value)
              )}
              placeholder={placeholder}
              value={input.value}
              variant="outlined"
            />
        )}
        subscription={{
          dirty: true,
          value: true,
        }}
        type="text"
      />
      <Field
        name={`${objectKey}_delete`}
        render={({ input }: FieldRenderProps<any>) => (
          <IconButton
            color={(!!input.value) ? 'primary' : 'default'}
            onClick={(_) => {
              input.onChange(!input.value);
              handleRemoveObject(objectKey, !input.value);
              setRemove(!input.value);
            }}
            size="small"
          >
            <DeleteIcon/>
          </IconButton>
        )}
        subscription={{ value: true }}
      />
      {index > 0
        ? <div className="MuiIconButton-root"/>
        : <IconButton
            onClick={handleAddObject}
            size="small"
          >
           <AddIcon/>
          </IconButton>
      }
      {/*<RenderCount/>*/}
    </div>
  );
};

export default ObjectRow;
