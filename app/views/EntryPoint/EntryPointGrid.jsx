import { makeStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
  topologyType,
  useResourceProperty,
} from 'link-redux';
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

import useSubmitHandler from './useSubmitHandler';
import EntryPointForm from './EntryPointForm';

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

const EntryPointGrid = (props) => {
  const {
    action,
    actionBody,
    httpMethod,
    name,
    smallButton,
    subject,
    topologyCtx,
    url,
  } = props;
  const classes = useStyles();
  const submitHandler = useSubmitHandler(props);
  const [object] = useResourceProperty(action, schema.object);
  const className = [footerTopology, navbarTopology].includes(topologyCtx) && classes.navbar;

  const footerButtons = (loading) => (
    <FormFooterRight>
      <Button
        loading={loading}
        small={smallButton}
        type="submit"
      >
        {name?.value}
      </Button>
    </FormFooterRight>
  );

  const formURL = new URL(subject.value);
  const formID = [formURL.origin, formURL.pathname].join('');

  return (
    <React.Fragment>
      <Property label={schema.isPartOf}>
        <GridHeader header={<Property label={schema.name} />}>
          <Property label={ontola.updateAction} onLoad={() => null} />
        </GridHeader>
        <Property label={schema.text} />
      </Property>
      <EntryPointForm
        actionBody={actionBody}
        className={className}
        footerButtons={footerButtons}
        formID={formID}
        httpMethod={httpMethod?.value}
        object={object}
        url={url?.value}
        onKeyUp={null}
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

EntryPointGrid.propTypes = {
  action: linkType,
  actionBody: linkType,
  httpMethod: linkType,
  name: linkType,
  smallButton: PropTypes.bool,
  subject: subjectType,
  topologyCtx: topologyType,
  url: linkType,
};

export default register(EntryPointGrid);
