import { makeStyles } from '@material-ui/styles';
import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import { TopologyContextType } from 'link-redux/dist-types/types';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import GridHeader from '../../components/Grid/GridHeader';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';
import FormFooter from '../../topologies/FormFooter';
import { gridTopology } from '../../topologies/Grid';
import { navbarTopology } from '../../topologies/Navbar';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

const useStyles = makeStyles({
  navbar: {
    '& .Button': {
      border: '1px solid',
      marginTop: '.5em',
      padding: '.2em 1em',
    },
    '& .MuiRadio-root': {
      color: 'white',
    },
  },
});

interface PropTypes {
  modal?: boolean;
  onDone?: (response: any) => void;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: any) => void;
  smallButton: boolean;
  topologyCtx: TopologyContextType;
}

const EntryPointGrid: FC<PropTypes> = ({
  modal,
  onDone,
  onStatusForbidden,
  responseCallback,
  smallButton,
  subject,
  topologyCtx,
}) => {
  const [action] = useProperty(schema.isPartOf) as SomeNode[];
  const [actionBody] = useProperty(ll.actionBody) as SomeNode[];
  const [httpMethod] = useProperty(schema.httpMethod);
  const [name] = useProperty(schema.name);
  const [url] = useProperty(schema.url);
  const classes = useStyles();
  const formURL = new URL(subject!.value);
  const formID = [formURL.origin, formURL.pathname].join('');
  const submitHandler = useSubmitHandler({
    entryPoint: subject!,
    formID,
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
  });
  const [object] = useResourceProperty(isNode(action) ? action : undefined, schema.object);
  const footer = React.useCallback((loading: boolean) => (
    <FormFooter>
      <Button
        loading={loading}
        small={smallButton}
        type="submit"
      >
        {name?.value}
      </Button>
    </FormFooter>
  ), [name, smallButton]);

  const className = clsx({
    [classes.navbar]: topologyCtx && [footerTopology, navbarTopology].includes(topologyCtx),
  });

  return (
    <React.Fragment>
      <Property label={schema.isPartOf}>
        <GridHeader header={<Property label={schema.name} />}>
          <Property
            label={ontola.updateAction}
            onLoad={() => null}
          />
        </GridHeader>
        <Property label={schema.text} />
      </Property>
      <EntryPointForm
        action={action}
        actionBody={actionBody}
        className={className}
        footer={footer}
        formID={formID}
        httpMethod={httpMethod?.value}
        object={isNode(object) ? object : undefined}
        url={url?.value}
        onKeyUp={undefined}
        onSubmit={submitHandler}
      />
    </React.Fragment>
  );
};

EntryPointGrid.type = schema.EntryPoint;

EntryPointGrid.topology = [
  footerTopology,
  gridTopology,
];

export default register(EntryPointGrid);
