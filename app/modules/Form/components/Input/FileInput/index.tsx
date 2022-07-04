import * as schema from '@ontologies/schema';
import { useNumbers } from 'link-redux';
import React from 'react';

import dbo from '../../../../Common/ontology/dbo';
import { useListToArr } from '../../../../Kernel/hooks/useListToArr';
import { useFileInput } from '../../../hooks/useFileInput';
import { useFormFieldForPath } from '../../../hooks/useFormFieldForPath';
import form from '../../../ontology/form';
import Dropzone from '../../Dropzone';
import { formFieldContext } from '../../FormField/FormFieldContext';
import { InputComponentProps } from '../../FormField/FormFieldTypes';
import HiddenRequiredInput from '../HiddenRequiredInput';

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
  const [maxSize] = useNumbers(form.maxFileSize);
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
          maxSize={maxSize}
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
