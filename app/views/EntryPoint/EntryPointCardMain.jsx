import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, link } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import {
  Button,
  CardContent,
  Form,
} from '../../components';
import FormFooterRight from '../../components/Form/FooterRight';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import FormFooter from '../../topologies/FormFooter/Footer';
import { cardTopology } from '../../topologies/Card';

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

    return (
      <Form
        action={new URL(url.value).pathname}
        formID={url.value}
        method={httpMethod}
        onSubmit={this.submitHandler}
      >
        {({ submitting }) => (
          <React.Fragment>
            <CardContent noStartSpacing={header}>
              <Property label={NS.schema('text')} />
              <Property label={NS.ll('actionBody')} />
            </CardContent>
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

const EntryPointCardMainForm = link([
  NS.schema('image'),
  NS.schema('name'),
  NS.schema('url'),
  NS.schema('httpMethod'),
])(EntryPointCardMain);

export default LinkedRenderStore.registerRenderer(
  withRouter(props => (
    <EntryPointCardMainForm
      form={props.subject.value}
      {...props}
    />
  )),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  [
    cardTopology,
    cardMainTopology,
  ]
);
