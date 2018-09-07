import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  Property,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import { getOrganization } from '../../state/app/selectors';
import Container from '../../topologies/Container';
import PageHeader from '../../topologies/PageHeader';

import Detail from './detail';
import Section from './section';
import Sidebar from './sidebar';
import Email from './properties/email';
import Image from './properties/image';

const propTypes = {
  feedIRI: PropTypes.string,
};

const PersonPage = ({ feedIRI }) => (
  <React.Fragment>
    <PageHeader>
      <Property label={NS.schema('name')} />
      <Property label={NS.schema('description')} />
    </PageHeader>
    <Container>
      <LinkedResourceContainer subject={feedIRI} />
    </Container>
  </React.Fragment>
);

PersonPage.propTypes = propTypes;

const mapStateToProps = (state, { subject }) => {
  const site = subject.site().value;
  const org = getOrganization(state);

  return ({
    feedIRI: subject && org && NS.app(`${org && org.term}/${subject.value.split(site).pop()}/feed`),
  });
};

export default [
  LinkedRenderStore.registerRenderer(
    connect(mapStateToProps)(PersonPage),
    [
      NS.schema('Person'),
      NS.foaf('Person'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name')], { returnType: 'value' })(({ name }) => (
      <Property ariaLabel={name} label={NS.schema('image')} />
    )),
    [NS.schema('Person'), NS.aod('Persons')],
    RENDER_CLASS_NAME,
    [NS.argu('voteEventSide'), NS.argu('voteBubble'), NS.argu('formFooter')]
  ),
  Detail,
  Email,
  Image,
  Section,
  Sidebar,
];
