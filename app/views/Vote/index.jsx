import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { CardContent } from '../../components';
import argu from '../../ontology/argu';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { popupTopology } from '../../topologies/Popup';

import Opinion from './Opinion';

const ThingHoverBoxHidden = ({ text, option }) => {
  let icon;
  switch (option) {
    case argu.yes.value:
      icon = 'thumbs-up';
      break;
    case argu.no.value:
      icon = 'thumbs-down';
      break;
    case argu.neutral.value:
    default:
      icon = 'pause';
      break;
  }

  return (
    <Container size="small">
      <Card>
        <DetailsBar>
          <Property label={schema.creator} />
          <Property label={schema.dateCreated} />
        </DetailsBar>
        <CardContent>
          <p><FontAwesome name={icon} style={{ margin: '.2em' }} />{text}</p>
        </CardContent>
      </Card>
    </Container>
  );
};

ThingHoverBoxHidden.propTypes = {
  option: PropTypes.string,
  text: PropTypes.string,
};

const mappedProps = {
  option: schema.option,
  text: schema.text,
};

export default [
  Opinion,
  LinkedRenderStore.registerRenderer(
    link(mappedProps, { returnType: 'value' })(ThingHoverBoxHidden),
    argu.Vote,
    RENDER_CLASS_NAME,
    popupTopology
  ),
];
