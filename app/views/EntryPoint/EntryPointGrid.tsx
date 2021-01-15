import { makeStyles } from '@material-ui/styles';
import { isNode, SomeTerm } from '@ontologies/core';
import schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useResourceProperty,
} from 'link-redux';
import { TopologyContextType } from 'link-redux/dist-types/types';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import FormFooterRight from '../../components/Form/FooterRight';
import GridHeader from '../../components/Grid/GridHeader';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';
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
  action: SomeNode;
  actionBody: SomeNode;
  httpMethod: SomeTerm;
  modal?: boolean;
  name: SomeTerm;
  onDone?: (response: any) => void;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: any) => void;
  smallButton: boolean;
  topologyCtx: TopologyContextType;
  url: SomeTerm;
}

const EntryPointGrid: FC<PropTypes> = (props) => {
  const {
    action,
    actionBody,
    httpMethod,
    modal,
    name,
    onDone,
    onStatusForbidden,
    responseCallback,
    smallButton,
    subject,
    topologyCtx,
    url,
  } = props;
  const classes = useStyles();
  const formURL = new URL(subject.value);
  const formID = [formURL.origin, formURL.pathname].join('');
  const submitHandler = useSubmitHandler({
    formID,
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
    subject,
  });
  const [object] = useResourceProperty(isNode(action) ? action : undefined, schema.object);
  const footerButtons = React.useCallback((loading: boolean) => (
    <FormFooterRight>
      <Button
        loading={loading}
        small={smallButton}
        type="submit"
      >
        {name?.value}
      </Button>
    </FormFooterRight>
  ), [name, smallButton]);

  const className = clsx({
    [classes.navbar]: topologyCtx && [footerTopology, navbarTopology].includes(topologyCtx),
  });

  return (
    <React.Fragment>
      <Property label={schema.isPartOf}>
        <GridHeader header={<Property label={schema.name} />}>
          <Property label={ontola.updateAction} onLoad={() => null} />
        </GridHeader>
        <Property label={schema.text} />
      </Property>
      <EntryPointForm
        action={action}
        actionBody={actionBody}
        className={className}
        footerButtons={footerButtons}
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

EntryPointGrid.mapDataToProps = {
  action: schema.isPartOf,
  actionBody: ll.actionBody,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointGrid);
