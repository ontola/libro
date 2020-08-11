import rdf, { NamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { normalizeType, SomeNode } from 'link-lib';
import { useLRS } from 'link-redux';
import React from 'react';
import Dropzone from 'react-dropzone';
import DropzoneOverlay from '../../components/Dropzone/DropzoneOverlay';
import Spinner from '../../components/Spinner';
import { convertKeysAtoB } from '../../helpers/data';
import { handle } from '../../helpers/logging';
import argu from '../../ontology/argu';

interface UploadTargetProps {
  uploadAction?: SomeNode;
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(rdf.literal(
      reader.result,
      argu.ns(`base64File?filename=${encodeURIComponent(file.name)}`),
    ));
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Creates a target in which files can be dropped, executes the given uploadAction with each file.
 *
 * In addition, files can be pasted into the document as well.
 */
const UploadTarget: React.FC<UploadTargetProps> = ({ children, uploadAction }) => {
  const lrs = useLRS();
  const [uploading, setUploading] = React.useState(false);

  const onDrop = (e: File | File[]) => {
    setUploading(true);
    const actions = normalizeType(e)
      .map((f) => getBase64(f).then((file) => {
        const formData = convertKeysAtoB({
          '@id': rdf.blankNode(),
          [schema.contentUrl.toString()]: file,
        }, false);

        return lrs.execActionByIRI(uploadAction as NamedNode, formData);
      }));

    return Promise.all(actions)
      .then((res) => {
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
            style={{position: 'relative'}}
            {...getRootProps()}
          >
            <Spinner loading={uploading} />
            {isDragActive && <DropzoneOverlay isDragActive overlay />}
            {children}
            <input {...getInputProps()} type="hidden" />
          </div>
        )
      }
    </Dropzone>
  );

};

export default UploadTarget;
