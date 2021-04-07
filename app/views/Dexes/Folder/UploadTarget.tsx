import rdf, { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { normalizeType } from 'link-lib';
import { useLRS } from 'link-redux';
import React from 'react';
import Dropzone from 'react-dropzone';

import DropzoneOverlay from '../../../components/Dropzone/DropzoneOverlay';
import Spinner from '../../../components/Spinner';
import { convertKeysAtoB } from '../../../helpers/data';
import { handle } from '../../../helpers/logging';
import useFileStore from '../../../hooks/useFileStore';

interface UploadTargetProps {
  children: JSX.Element;
  uploadAction?: NamedNode;
}

/**
 * Creates a target in which files can be dropped, executes the given uploadAction with each file.
 *
 * In addition, files can be pasted into the document as well.
 */
const UploadTarget = ({ children, uploadAction }: UploadTargetProps): JSX.Element => {
  const lrs = useLRS();
  const [uploading, setUploading] = React.useState(false);
  const [storeFile] = useFileStore();

  const onDrop = (acceptedFiles: File | File[]) => {
    if (!uploadAction) {
      return [];
    }

    setUploading(true);
    const actions = normalizeType(acceptedFiles).map((file) => {
      const [fileReference, newStore] = storeFile(file);

      const formData = convertKeysAtoB({
        '@id': rdf.blankNode(),
        [schema.contentUrl.toString()]: fileReference,
      }, newStore, false);

      return lrs.execActionByIRI(uploadAction, formData);
    });

    return Promise.all(actions).then((res) => {
      setUploading(false);

      return res;
    }).catch((error) => {
      setUploading(false);
      handle(error);
    });
  };

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
  });

  if (!uploadAction) {
    return children;
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
          <Spinner loading={uploading} />
          {isDragActive && <DropzoneOverlay isDragActive overlay />}
          {children}
          <input {...getInputProps()} type="hidden" />
        </div>
      )}
    </Dropzone>
  );

};

export default UploadTarget;
