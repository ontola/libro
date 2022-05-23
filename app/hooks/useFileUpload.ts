import rdf, { SomeTerm } from '@ontologies/core';
import { useLRS } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { appContext } from '../appContext';
import { handle } from '../helpers/logging';
import Uploader from '../components/Input/FileInput/Uploader';
import { formMessages } from '../translations/messages';

type UploadFile = (newFile: File, handleUploadFinished: (signedId: SomeTerm) => void) => void;

export type UseFileUpload = [uploadFile: UploadFile, progress: number | undefined];

export const useFileUpload = (): UseFileUpload => {
  const intl = useIntl();
  const { manifest } = React.useContext(appContext);
  const directUploadUrl = manifest.ontola.blob_upload_iri;

  const lrs = useLRS();

  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleError = (error: Error) => {
    setUploading(false);
    lrs.actions.ontola.showSnackbar(intl.formatMessage(formMessages.fileUploadFailed));
    handle(error);
  };

  const handleProgress = (e: ProgressEvent) => {
    if (e.lengthComputable) {
      setProgress((e.loaded / e.total) * 100);
    }
  };

  const uploadFile = React.useCallback<UploadFile>((newFile, handleUploadFinished) => {
    setUploading(true);
    setProgress(0);

    const handleFinish = (signedId: string) => {
      setUploading(false);
      handleUploadFinished(rdf.literal(signedId));
    };

    if (!directUploadUrl) {
      throw new Error('No upload url in manifest');
    }

    new Uploader(directUploadUrl, handleProgress, handleFinish, handleError).upload(newFile);
  }, []);

  return [uploadFile, uploading ? progress : undefined];
};
