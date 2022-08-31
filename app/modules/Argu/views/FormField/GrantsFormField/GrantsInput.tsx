import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  term,
  terms,
  useDataFetching,
  useGlobalIds,
  useIds,
  useLRS,
  useResourceLinks,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formContext } from '../../../../Form/components/Form/FormContext';
import { formFieldContext } from '../../../../Form/components/FormField/FormFieldContext';
import useInputId from '../../../../Form/hooks/useInputId';
import {
  JSONLDObject,
  idFromJSONLDObject,
  isJSONLDObject,
} from '../../../../Form/lib/helpers';
import form from '../../../../Form/ontology/form';
import { useContainerToArr } from '../../../../Kernel/hooks/useContainerToArr';
import { entityIsLoaded } from '../../../../Kernel/lib/data';
import { grantsInputMessages } from '../../../lib/messages';
import argu from '../../../ontology/argu';

import GrantInputWrapper from './GrantInputWrapper';

const permissionGroupMap = {
  grantSet: term(argu.grantSet),
  group: term(argu.group),
  inheritedGrantSets: terms(argu.grantSets),
};

export type PermissionGroup = {
  grantSet: SomeTerm;
  group: SomeTerm;
  inheritedGrantSets: SomeTerm[];
};

const GrantsInput: React.FC = () => {
  const lrs = useLRS();
  const { values } = React.useContext(formFieldContext);
  const normalizedValues = React.useMemo<JSONLDObject[]>(
    () => values?.filter(isJSONLDObject) ?? [],
    [values],
  );
  const { object } = React.useContext(formContext);
  const [parent] = useIds(object, schema.isPartOf);
  const [grantsForm] = useIds(form.form);
  const groupInput = useInputId(grantsForm, argu.group);
  const [groupsIRI] = useGlobalIds(groupInput, sh.shaclin);
  const grantSetInput = useInputId(grantsForm, argu.grantSet);
  const [groups, groupsCollectionLoading] = useContainerToArr<NamedNode>(groupsIRI);
  const groupsLoading = groupsCollectionLoading || groups.some((group) => !entityIsLoaded(lrs, group));
  const [permissionGroupsIRI] = useGlobalIds(parent, argu.permissionGroups);
  const [permissionGroups] = useContainerToArr<SomeNode>(permissionGroupsIRI);
  useDataFetching(permissionGroups);
  useDataFetching(groups);
  const permissionGroupValues = useResourceLinks(permissionGroups, permissionGroupMap) as PermissionGroup[];

  if (!grantsForm || !grantSetInput || groupsLoading) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        sx={{ minWidth: 650 }}
      >
        <colgroup>
          <col style={{ width:'20%' }} />
          <col style={{ width:'20%' }} />
          <col style={{ width:'60%' }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage {...grantsInputMessages.group} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...grantsInputMessages.inherited} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...grantsInputMessages.add} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {normalizedValues.map((value, index) => (
            <GrantInputWrapper
              grantSetInput={grantSetInput}
              grantsForm={grantsForm}
              index={index}
              key={idFromJSONLDObject(value).value}
              permissionGroups={permissionGroupValues}
              value={value}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GrantsInput;
