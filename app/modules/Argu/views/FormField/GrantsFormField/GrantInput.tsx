import { TableCell, TableRow } from '@mui/material';
import { isNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  Resource,
  useDataFetching,
  useStrings,
} from 'link-redux';
import React from 'react';

import { namePredicates } from '../../../../Common/lib/predicates';
import { useFormFieldForPath } from '../../../../Form/hooks/useFormFieldForPath';
import {
  JSONLDObject,
  retrieveIdFromValue,
} from '../../../../Form/lib/helpers';
import argu from '../../../ontology/argu';

import { PermissionGroup } from './GrantsInput';

interface GrantInput {
  grantSetInput: SomeNode,
  value: JSONLDObject,
  permissionGroups: PermissionGroup[],
}

const GrantInput = ({
  grantSetInput,
  permissionGroups,
}: GrantInput): JSX.Element => {
  const { values: groupValues } = useFormFieldForPath(argu.group);

  const group = retrieveIdFromValue(groupValues[0]);
  const [groupName] = useStrings(group, namePredicates);
  const permissionGroup = permissionGroups.find((v) => v.group === group);
  const inheritedGrantSets = permissionGroup?.inheritedGrantSets?.filter(isNode) ?? [];
  useDataFetching(inheritedGrantSets);
  const inheritedGrantSetNames = useStrings(inheritedGrantSets, namePredicates).map((arr) => arr[0]);

  return (
    <TableRow>
      <TableCell>
        {groupName}
      </TableCell>
      <TableCell>
        {inheritedGrantSetNames.join(', ')}
      </TableCell>
      <TableCell>
        <Resource subject={grantSetInput} />
      </TableCell>
    </TableRow>
  );
};

export default GrantInput;
