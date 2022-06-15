import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
  useDataFetching,
  useIds,
} from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/ontology/argu';
import meeting from '../../../../../ontology/meeting';
import ontola from '../../../../../ontology/ontola';
import { mainBodyTopology } from '../../../../../topologies';
import List from '../../../../../topologies/List';
import UploadTarget from '../../../../Dexes/views/Folder/UploadTarget';

const AttachmentsMainBody: FC<PropertyProps> = ({
  linkedProp,
}) => {
  const [uploadAction] = useIds(isNamedNode(linkedProp) ? linkedProp : undefined, ontola.createAction);
  useDataFetching([isNamedNode(linkedProp) ? linkedProp : undefined, uploadAction]);

  if (!isNamedNode(linkedProp)) {
    return null;
  }

  return (
    <UploadTarget uploadAction={uploadAction}>
      <List wrap>
        <Resource
          wrap
          subject={linkedProp}
        />
      </List>
    </UploadTarget>
  );
};

AttachmentsMainBody.type = schema.Thing;

AttachmentsMainBody.property = [argu.attachments, meeting.attachment];

AttachmentsMainBody.topology = mainBodyTopology;

export default register(AttachmentsMainBody);
