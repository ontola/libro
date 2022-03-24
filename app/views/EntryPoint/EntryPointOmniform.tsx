import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import EntryPointForm from '../../components/Form/EntryPointForm';
import { FormTheme } from '../../components/Form/Form';
import { LoadingGridContent } from '../../components/Loading';
import Card from '../../topologies/Card';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

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
