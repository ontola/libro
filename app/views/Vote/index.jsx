import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  linkType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  CardContent,
  HoverPopup,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { popupTopology } from '../../topologies/Popup';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';

import Opinion from './Opinion';

const propTypes = {
  subject: subjectType,
  text: linkType,
};

const VoteSidePage = ({ subject, text }) => {
  if (!text || text.length === 0) {
    return <Property label={schema.creator} />;
  }

  return (
    <HoverPopup subject={subject}>
      <Property label={schema.creator} />
    </HoverPopup>
  );
};

VoteSidePage.propTypes = propTypes;

const ThingHoverBoxHidden = ({ text, option }) => {
  let icon;
  switch (option) {
    case NS.argu('yes').value:
      icon = 'thumbs-up';
      break;
    case NS.argu('no').value:
      icon = 'thumbs-down';
      break;
    case NS.argu('neutral').value:
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
    link(mappedProps, { returnType: 'value' })(VoteSidePage),
    NS.argu('Vote'),
    RENDER_CLASS_NAME,
    voteEventSideTopology
  ),
  LinkedRenderStore.registerRenderer(
    link(mappedProps, { returnType: 'value' })(ThingHoverBoxHidden),
    NS.argu('Vote'),
    RENDER_CLASS_NAME,
    popupTopology
  ),
];
