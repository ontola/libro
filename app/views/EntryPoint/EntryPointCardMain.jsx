import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

const EntryPointCardMain = (props) => {
  const {
    action,
    actionBody,
    autoSubmit,
    httpMethod,
    cancelPath,
    name,
    onCancel,
    sessionStore,
    subject,
    url,
  } = props;
  const history = useHistory();
  const submitHandler = useSubmitHandler(props);
  const onCancelClick = React.useCallback((e) => {
    e.preventDefault();

    if (onCancel) {
      onCancel(e);
    } else {
      history.goBack();
    }
  });
  const [object] = useResourceProperty(action, schema.object);
  const [errorResponse] = useResourceProperty(action, ll.errorResponse);

  const cancelButton = cancelPath && (
    <Button
      href={cancelPath}
      theme="transparant"
      onClick={onCancelClick}
    >
      <FormattedMessage
        defaultMessage="cancel"
        id="https://app.argu.co/i18n/forms/actions/cancel"
      />
    </Button>
  );

  const footerButtons = (loading) => (
    <FormFooterRight>
      {cancelButton}
      <Button
        loading={loading}
        theme="submit"
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
      <CardContent>
        <Property label={schema.text} />
      </CardContent>
      <EntryPointForm
        actionBody={actionBody}
        autoSubmit={autoSubmit}
        contentWrapper={CardContent}
        errorResponse={errorResponse}
        footerButtons={footerButtons}
        formID={formID}
        httpMethod={httpMethod?.value}
        object={object}
        sessionStore={sessionStore}
        url={url?.value}
        onKeyUp={null}
        onSubmit={submitHandler}
      />
    </React.Fragment>
  );
};

EntryPointCardMain.type = schema.EntryPoint;

EntryPointCardMain.topology = [
  cardTopology,
  cardMainTopology,
];

EntryPointCardMain.mapDataToProps = {
  action: schema.isPartOf,
  actionBody: ll.actionBody,
  errorResponse: ll.errorResponse,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

EntryPointCardMain.propTypes = {
  action: linkType,
  actionBody: linkType,
  autoSubmit: PropTypes.bool,
  cancelPath: PropTypes.string,
  httpMethod: linkType,
  name: linkType,
  onCancel: PropTypes.func,
  sessionStore: PropTypes.objectOf(PropTypes.any),
  subject: subjectType,
  url: linkType,
};

export default register(EntryPointCardMain);
