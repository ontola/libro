import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  Property,
  withLRS,
} from 'link-redux';
import React from 'react';

import {
  Button,
  CardContent,
  Form,
} from '../../components';
import FormFooterRight from '../../components/Form/FooterRight';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import FormFooter from '../../topologies/FormFooter/Footer';

import EntryPointBase from './EntryPointBase';

class EntryPointContainer extends EntryPointBase {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    const {
      httpMethod,
      invalid,
      url,
    } = this.props;

    return (
      <Form
        validateOnChange
        action={new URL(url.value).pathname}
        method={httpMethod}
        onSubmit={this.submitHandler}
      >
        {({ submitting }) => (
          <React.Fragment>
            <Property label={NS.schema('name')} />
            <Card>
              <CardContent>
                <Property label={NS.schema('text')} />
                <Property label={NS.ll('actionBody')} />
              </CardContent>
              <FormFooter>
                <LinkedResourceContainer subject={NS.app('c_a')} />
                <FormFooterRight>
                  <Button
                    href={retrievePath(url.value)}
                    theme="transparant"
                  >
                    Annuleren
                  </Button>
                  <Button
                    disabled={invalid}
                    icon="send"
                    loading={submitting}
                    theme="submit"
                    type="submit"
                  >
                    Opslaan
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
  withLRS(props => (
    <EntryPointContainerForm
      form={props.subject.value}
      {...props}
    />
  )),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  containerTopology
);
