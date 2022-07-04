import { DeepRecord } from 'link-lib';
import React from 'react';

import ErrorBoundary from '../../../../Common/components/ErrorBoundary';
import { DeepSeedDataRecord } from '../../../../Common/lib/seed';
import ElementsEditorLoader from '../../../../ElementsEditor/components/ElementsEditorLoader';

interface DataEditorProps {
  onChange: (v: DeepRecord | undefined) => void;
  onMount?: () => void;
  record: DeepSeedDataRecord;
  websiteIRI: string;
}

export const ElementsEditorWrapper = ({
  record,
  websiteIRI,
  onChange,
}: DataEditorProps): JSX.Element => (
  <ErrorBoundary>
    <ElementsEditorLoader
      placeholder="test"
      value={record}
      websiteIRI={websiteIRI}
      onChange={onChange}
    />
  </ErrorBoundary>
);
