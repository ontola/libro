import rdf, { Literal } from '@ontologies/core';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import argu from '../ontology/argu';

export interface PreviewedFile extends File {
  preview: string;
}

export interface FileStore {
  [fileReference: string]: PreviewedFile;
}

export type StoreFile = (file: File) => [Literal, FileStore];

const useFileStore = (): [StoreFile, FileStore] => {
  const [fileStore, setFileStore] = React.useState<FileStore>({});

  const storeFile = React.useCallback<StoreFile>((file) => {
    const uuid = uuidv4();
    const literal = rdf.literal(
      uuid,
      argu.ns('base64File'),
    );
    const newStore = {
      ...fileStore,
      [literal.value]: file,
    };
    setFileStore(newStore);

    return [literal, newStore];
  }, [fileStore]);

  // Free memory of stored files
  React.useEffect(() => () => {
    Object.values(fileStore).forEach((file) => URL.revokeObjectURL(file.preview));
  }, [fileStore]);

  return [
    storeFile,
    fileStore,
  ];
};

export default useFileStore;
