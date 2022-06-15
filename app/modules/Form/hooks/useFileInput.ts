import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import React from 'react';
import parser, { Template } from 'uri-template';

import dbo from '../../../ontology/dbo';
import { appContext } from '../../Core/components/AppContext/appContext';
import { InputChangeHandler, InputValue } from '../components/FormField/FormFieldTypes';

import { useFileUpload } from './useFileUpload';
import { useFormFieldForPath } from './useFormFieldForPath';

export type HandleFileChange = (newFile: File | undefined) => void;
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
    if (newFile) {
      encodingFormatOnChange([rdf.literal(newFile.type)]);
      fileNameFormatOnChange([rdf.literal(newFile.name)]);
      uploadFile(newFile, handleChange);
    } else {
      encodingFormatOnChange([rdf.literal('')]);
      fileNameFormatOnChange([rdf.literal('')]);
      handleChange(rdf.literal(''));
    }
  }, [handleChange]);

  const preview = previewUrl(blobPreviewUrl, inputValue);

  return [handleFileChange, progress, preview];
};
