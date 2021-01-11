import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import rdf, { isNamedNode, NamedNode } from '@ontologies/core';
import xsd from '@ontologies/xsd';
import React, { useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form';

interface DataTypeType {
  inputValue?: string;
  iri: NamedNode;
  title: string;
}

const dataTypes: DataTypeType[] = Object.entries(xsd).reduce(
  (acc: DataTypeType[], [key, value]) => (
    isNamedNode(value) ? acc.concat({ title: key, iri: value }) : acc
  ),
  [{
    iri: rdf.namedNode(''),
    title: 'NamedNode',
  }],
);

const DataType = ({ input: { onChange, value: initialValue }, ...rest }: FieldRenderProps<any>) => {
  const [value, setValue] = React.useState<DataTypeType | null>(null);
  const [open, toggleOpen] = React.useState(false);

  useEffect(() => {
    if (!initialValue) {
      return;
    }
    let dataType = dataTypes.find((type) => (
      type.iri.value === initialValue || initialValue === 'NamedNode'
    ));
    if (!dataType) {
      dataType = {
        iri: rdf.namedNode(initialValue),
        title: initialValue,
      };
      dataTypes.push(dataType);
    }
    setValue(dataType);
  }, [initialValue]);

  const handleClose = () => {
    setDialogValue({ iri: '' });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({ iri: '' });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newDataType = {
      iri: rdf.namedNode(dialogValue.iri),
      title: dialogValue.iri,
    };
    dataTypes.push(newDataType);
    setValue(newDataType);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        clearOnBlur
        filterOptions={(options, params) => {
          const filtered = createFilterOptions<DataTypeType>()(options, params);
          filtered.push({
            inputValue: params.inputValue,
            iri: rdf.namedNode(''),
            title: 'Anders...',
          });

          return filtered;
        }}
        getOptionLabel={(option) => {
          if (option.inputValue) {
            return option.inputValue;
          }

          return option.title || option.iri.value;
        }}
        handleHomeEndKeys
        id="dataTypeAutocomplete"
        onChange={(_, newValue) => {
          if (newValue && newValue.title === 'Anders...') {
            toggleOpen(true);
            setDialogValue({
              iri: '',
            });
          } else {
            setValue(newValue);
          }
          onChange(newValue?.iri.value);
        }}
        options={dataTypes}
        renderOption={(option) => option.title}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} style={{ display: 'flex' }}>
            <input type="text" {...params.inputProps} {...rest} />
          </div>
        )}
        selectOnFocus
        value={value}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Datatype</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth={true}
              id="name"
              label="IRI"
              margin="dense"
              onChange={(event) => (
                setDialogValue({
                  iri: event.target.value,
                })
              )}
              type="text"
              value={dialogValue.iri}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuleren
            </Button>
            <Button type="submit" color="primary">
              Toevoegen
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default DataType;
