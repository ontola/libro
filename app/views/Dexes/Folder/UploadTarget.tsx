import rdf, { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode, normalizeType } from 'link-lib';
import { useActionById, useGlobalIds } from 'link-redux';
import React from 'react';
import Dropzone from 'react-dropzone';

import DropzoneOverlay from '../../../components/Dropzone/DropzoneOverlay';
import UploadProgress from '../../../components/Input/FileInput/UploadProgress';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { convertKeysAtoB } from '../../../helpers/data';
import { handle } from '../../../helpers/logging';
import { isInvalidActionStatus } from '../../Thing/properties/omniform/helpers';

interface UploadTargetProps {
  children: JSX.Element | JSX.Element[];
  uploadAction?: SomeNode;
}

/**
 * Creates a target in which files can be dropped, executes the given uploadAction with each file.
 *
 * In addition, files can be pasted into the document as well.
 */
const UploadTarget = ({ children, uploadAction }: UploadTargetProps): JSX.Element => {
  const [fileQueue, setFileQueue] = React.useState<File[]>([]);
  const [uploadFile, progress] = useFileUpload();
  const [submitting, setSubmitting] = React.useState(false);
  const uploadHandler = useActionById(uploadAction);
  const inputRef = React.createRef<HTMLInputElement>();
  const [actionStatus] = useGlobalIds(uploadAction, schema.actionStatus);
  const uploadEnabled = !isInvalidActionStatus(actionStatus);

  const onDrop = React.useCallback((acceptedFiles: File | File[]) => {
    if (uploadEnabled) {
      setFileQueue((currentQueue) => [...currentQueue, ...normalizeType(acceptedFiles)]);
    }
  }, [uploadEnabled, setSubmitting, uploadHandler]);

  React.useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (e.clipboardData) {
        const items = e.clipboardData.files;

        for (const item of items) {
          onDrop(item);
        }
      }
    };

    document.addEventListener('paste', handler);

    return () => {
      document.removeEventListener('paste', handler);
    };
  }, [onDrop]);

  React.useEffect(() => {
    const [nextFile, ...filesLeft] = fileQueue;

    if (!submitting && nextFile && uploadHandler) {
      setSubmitting(true);
      setFileQueue(filesLeft);

      const handleUploadFinished = (signedId: SomeTerm) => {
        const formData = convertKeysAtoB({
          '@id': rdf.blankNode(),
          [schema.contentUrl.toString()]: signedId,
        }, false);

        uploadHandler(formData).then(() => {
          setSubmitting(false);
        }).catch((error) => {
          setSubmitting(false);
          handle(error);
        });
      } ;

      uploadFile(nextFile, handleUploadFinished);
    }
  }, [submitting, fileQueue, uploadHandler]);

  if (!uploadEnabled) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  return (
    <Dropzone
      multiple
      onDrop={onDrop}
    >
      {({
        getInputProps,
        getRootProps,
        isDragActive,
      }) => (
        <div
          data-debug="dropzone-wrapper"
          style={{ position: 'relative' }}
          {...getRootProps()}
        >
          {progress !== undefined && (
            <UploadProgress value={progress} />
          )}
          {isDragActive && (
            <DropzoneOverlay
              isDragActive
              overlay
            />
          )}
          {children}
          <input
            {...getInputProps()}
            ref={inputRef}
            type="hidden"
          />
        </div>
      )}
    </Dropzone>
  );

};

export default UploadTarget;
