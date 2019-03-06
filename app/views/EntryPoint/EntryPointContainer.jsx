import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
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
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import FormFooter from '../../topologies/FormFooter/Footer';

import EntryPointBase from './EntryPointBase';

class EntryPointContainer extends EntryPointBase {
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
            <Card>
              <CardContent>
                <Property label={NS.schema('text')} />
                <Property label={NS.ll('actionBody')} />
              </CardContent>
              <FormFooter>
                {this.footerGroup()}
                <FormFooterRight>
                  {cancelButton}
                  <Button
                    disabled={invalid}
                    icon="send"
                    loading={submitting}
                    theme="submit"
                    type="submit"
                  >
                    {name.value}
                  </Button>
                </FormFooterRight>
              </FormFooter>
            </Card>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

const EntryPointContainerForm = link([
  NS.schema('image'),
  NS.schema('name'),
  NS.schema('url'),
  NS.schema('httpMethod'),
])(EntryPointContainer);

export default LinkedRenderStore.registerRenderer(
  withRouter(props => (
    <EntryPointContainerForm
      form={props.subject.value}
      {...props}
    />
  )),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  containerTopology
);
