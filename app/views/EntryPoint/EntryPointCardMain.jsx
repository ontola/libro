import schema from '@ontologies/schema';
import {
  Property,
  register,
  withLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';

import EntryPointBase from './EntryPointBase';
import EntryPointForm from './EntryPointForm';

class EntryPointCardMain extends EntryPointBase {
  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
  }

  onCancel(e) {
    e.preventDefault();

    const { history, onCancel } = this.props;

    if (onCancel) {
      onCancel(e);
    } else {
      history.goBack();
    }
  }

  render() {
    const {
      action,
      actionBody,
      httpMethod,
      cancelPath,
      header,
      lrs,
      name,
      sessionStore,
      subject,
      url,
    } = this.props;
    const object = lrs.getResourceProperty(action, schema.object);
    const errorResponse = lrs.getResourceProperty(action, ll.errorResponse);

    const cancelButton = cancelPath && (
      <Button
        href={cancelPath}
        theme="transparant"
        onClick={this.onCancel}
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
        <CardContent noStartSpacing={header}>
          <Property label={schema.text} />
        </CardContent>
        <EntryPointForm
          actionBody={actionBody}
          contentWrapper={CardContent}
          errorResponse={errorResponse}
          footerButtons={footerButtons}
          formID={formID}
          httpMethod={httpMethod?.value}
          object={object}
          sessionStore={sessionStore}
          url={url?.value}
          onKeyUp={null}
          onSubmit={this.submitHandler}
        />
      </React.Fragment>
    );
  }
}

EntryPointCardMain.type = schema.EntryPoint;

EntryPointCardMain.topology = [
  cardTopology,
  cardMainTopology,
];

EntryPointCardMain.hocs = [withLRS, withRouter];

EntryPointCardMain.mapDataToProps = {
  action: schema.isPartOf,
  actionBody: ll.actionBody,
  errorResponse: ll.errorResponse,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointCardMain);
