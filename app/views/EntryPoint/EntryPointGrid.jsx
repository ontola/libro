import { withStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router';

import Button from '../../components/Button';
import FormFooterRight from '../../components/Form/FooterRight';
import GridHeader from '../../components/Grid/GridHeader';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';
import { gridTopology } from '../../topologies/Grid';
import { navbarTopology } from '../../topologies/Navbar';

import EntryPointBase from './EntryPointBase';
import EntryPointForm from './EntryPointForm';

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
      action,
      actionBody,
      classes,
      httpMethod,
      lrs,
      name,
      smallButton,
      subject,
      topologyCtx,
      url,
    } = this.props;
    const className = [footerTopology, navbarTopology].includes(topologyCtx) && classes.navbar;

    const object = lrs.getResourceProperty(action, schema.object);

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
          onSubmit={this.submitHandler}
        />
      </React.Fragment>
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
  actionBody: ll.actionBody,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointGrid);
