import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import Card from '../../../Common/topologies/Card';
import { LoadingGridContent } from '../../../Common/components/Loading';
import EntryPointForm from '../../../Form/components/Form/EntryPointForm';
import { FormTheme } from '../../../Form/components/Form/FormContext';
import { omniformFieldsTopology } from '../../../Omniform/topologies/OmniformFields/OmniformFields';

import useEntryPointFormProps, { EntryPointProps } from './useEntryPointFormProps';

interface EntryPointOmniformProps extends EntryPointProps {
  parentIRI: string;
}

const EntryPointOmniform: FC<EntryPointOmniformProps> = ({
  footer,
  parentIRI,
  subject,
  ...otherProps
}) => {
  const formID = `${atob(parentIRI)}.omniform`;
  const entryPointFormProps = useEntryPointFormProps(
    subject!,
    {
      ...otherProps,
      formID,
    },
  );

  return (
    <EntryPointForm
      {...entryPointFormProps}
      Wrapper={Card}
      footer={footer}
      theme={FormTheme.Preview}
      onLoad={() => (
        <CardContent>
          <LoadingGridContent />
        </CardContent>
      )}
    />
  );
};

EntryPointOmniform.type = schema.EntryPoint;

EntryPointOmniform.topology = omniformFieldsTopology;

export default register(EntryPointOmniform);
