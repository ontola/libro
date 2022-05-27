import * as schema from '@ontologies/schema';
import React from 'react';

import Dropzone from '../../../containers/Dropzone';
import { useFormFieldForPath } from '../../../hooks/useFormFieldForPath';
import { useListToArr } from '../../../hooks/useListToArr';
import dbo from '../../../ontology/dbo';
import { formFieldContext } from '../../FormField/FormFieldContext';
import { InputComponentProps } from '../../FormField/FormFieldTypes';
import HiddenRequiredInput from '../HiddenRequiredInput';

import { useFileInput } from './lib/useFileInput';
import UploadProgress from './UploadProgress';

const FileInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const {
    name,
    fieldShape,
  } = React.useContext(formFieldContext);

  const { required } = fieldShape;
  const { values: fileNameFormatValues } = useFormFieldForPath(dbo.filename);
  const {
    fieldShape: encodingFormatShape,
    values: encodingFormatValues,
  } = useFormFieldForPath(schema.encodingFormat);
  const [encodingFormatConversion, encodingFormatLoading] = useListToArr(encodingFormatShape.shIn);
  const [handleFileChange, progress, preview] = useFileInput(inputValue, onChange);

  const [encodingFormatTypes, setEncodingFormatTypes] = React.useState<string>('');

  React.useEffect(() => {
    if (!encodingFormatLoading) {
      setEncodingFormatTypes(encodingFormatConversion.map((lit) => lit.value).join(', '));
    }
  }, [encodingFormatConversion, encodingFormatLoading]);

  const inputRef = React.createRef<HTMLInputElement>();

  const openDialog = React.useCallback(() => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    current.click();
  }, [inputRef]);

  return (
    <React.Fragment>
      {required && (
        <HiddenRequiredInput
          name={name}
          value={inputValue?.value}
        />
      )}
      {progress !== undefined ? (
        <UploadProgress value={progress} />
      ) : (
        <Dropzone
          clearable={!fieldShape.required}
          encodingFormat={encodingFormatValues?.[0]?.value}
          encodingFormatTypes={encodingFormatTypes || ''}
          fileName={fileNameFormatValues?.[0]?.value}
          inputRef={inputRef}
          name={name}
          openDialog={openDialog}
          preview={preview}
          onChange={handleFileChange}
        />
      )}
    </React.Fragment>
  );
};

export default FileInput;
