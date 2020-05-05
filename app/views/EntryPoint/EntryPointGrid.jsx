import { withStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router';

import Button from '../../components/Button';
import GridHeader from '../../components/Grid/GridHeader';
import Form from '../../containers/Form';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';
import { gridTopology } from '../../topologies/Grid';
import { navbarTopology } from '../../topologies/Navbar';

import EntryPointBase from './EntryPointBase';

const styles = {
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
};

class EntryPointGrid extends EntryPointBase {
  render() {
    const {
      classes,
      httpMethod,
      invalid,
      name,
      subject,
      topologyCtx,
      url,
    } = this.props;
    const formURL = new URL(subject.value);
    const formID = [formURL.origin, formURL.pathname].join('');
    const className = [footerTopology, navbarTopology].includes(topologyCtx) && classes.navbar;

    return (
      <Form
        action={new URL(url.value).pathname}
        className={className}
        formID={formID}
        method={httpMethod}
        onSubmit={this.submitHandler}
      >
        {({ submitting }) => (
          <React.Fragment>
            <Property label={schema.isPartOf}>
              <GridHeader header={<Property label={schema.name} />}>
                <Property label={ontola.updateAction} onLoad={() => null} />
              </GridHeader>
              <Property label={schema.text} />
            </Property>
            <Property label={ll.actionBody} />
            <Button
              disabled={invalid}
              loading={submitting}
              type="submit"
            >
              {name?.value}
            </Button>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

EntryPointGrid.type = schema.EntryPoint;

EntryPointGrid.topology = [
  footerTopology,
  gridTopology,
];

EntryPointGrid.hocs = [withStyles(styles), withRouter];

EntryPointGrid.mapDataToProps = {
  action: schema.isPartOf,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointGrid);
