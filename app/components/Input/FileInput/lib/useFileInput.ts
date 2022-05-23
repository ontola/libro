import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import React from 'react';
import parser, { Template } from 'uri-template';

import { appContext } from '../../../../appContext';
import { useFormFieldForPath } from '../../../../hooks/useFormFieldForPath';
import dbo from '../../../../ontology/dbo';
import { InputChangeHandler, InputValue } from '../../../FormField/FormFieldTypes';
import { useFileUpload } from '../../../../hooks/useFileUpload';

type HandleFileChange = (newFile: File) => void;
type UseFileUpload = [handleFileChange: HandleFileChange, progress: number | undefined, preview: string | undefined];

const previewUrl = (iriTemplate: Template | undefined, inputValue: InputValue): string | undefined => {
  if (!inputValue?.value || !iriTemplate) {
    return undefined;
  }

  return inputValue.value.includes('http') ? inputValue.value : iriTemplate.expand({
    'signed_id': inputValue?.value,
  });
};

export const useFileInput = (inputValue: InputValue, handleChange: InputChangeHandler): UseFileUpload => {
  const { manifest } = React.useContext(appContext);
  const blobPreviewUrl = manifest.ontola.blob_preview_iri ? parser.parse(manifest.ontola.blob_preview_iri) : undefined;

  const { onChange: fileNameFormatOnChange } = useFormFieldForPath(dbo.filename);
  const { onChange: encodingFormatOnChange } = useFormFieldForPath(schema.encodingFormat);

  const [uploadFile, progress] = useFileUpload();

  const handleFileChange = React.useCallback<HandleFileChange>((newFile) => {
    encodingFormatOnChange([rdf.literal(newFile.type)]);
    fileNameFormatOnChange([rdf.literal(newFile.name)]);

    uploadFile(newFile, handleChange);
  }, [handleChange]);

  const preview = previewUrl(blobPreviewUrl, inputValue);

  return [handleFileChange, progress, preview];
};
