import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import Form from '../../containers/Form';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import FormFooter from '../../topologies/FormFooter/Footer';

import EntryPointBase from './EntryPointBase';

class EntryPointCardMain extends EntryPointBase {
  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
  }

  onCancel(e) {
    e.preventDefault();

    const { history, onCancel } = this.props;

    if (!onCancel || history.length > 1) {
      history.goBack();
    } else {
      onCancel(e);
    }
  }

  render() {
    const {
      httpMethod,
      cancelPath,
      header,
      invalid,
      name,
      subject,
      url,
    } = this.props;
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

    const formURL = new URL(subject.value);
    const formID = [formURL.origin, formURL.pathname].join('');

    const content = (
      <CardContent noStartSpacing={header}>
        <Property label={schema.text} />
        <Property label={ll.actionBody} />
      </CardContent>
    );

    return (
      <Form
        action={new URL(url.value).pathname}
        formID={formID}
        method={httpMethod}
        onSubmit={this.submitHandler}
      >
        {({ submitting }) => (
          <React.Fragment>
            {content}
            <FormFooter>
              {this.footerGroup()}
              <FormFooterRight>
                {cancelButton}
                <Button
                  disabled={invalid}
                  loading={submitting}
                  theme="submit"
                  type="submit"
                >
                  {name?.value}
                </Button>
              </FormFooterRight>
            </FormFooter>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

EntryPointCardMain.type = schema.EntryPoint;

EntryPointCardMain.topology = [
  cardTopology,
  cardMainTopology,
];

EntryPointCardMain.hocs = [withRouter];

EntryPointCardMain.mapDataToProps = {
  action: schema.isPartOf,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointCardMain);
