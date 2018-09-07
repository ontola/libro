import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link, linkedPropType,
  Property,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Card,
  CardContent,
  HoverPopup,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';

const propTypes = {
  subject: linkedPropType,
  text: linkedPropType,
};

const VoteSidePage = ({ subject, text }) => {
  if (!text || text.length === 0) {
    return <Property label={NS.schema('creator')} />;
  }

  return (
    <HoverPopup subject={subject}>
      <Property label={NS.schema('creator')} />
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
        <CardContent>
          <DetailsBar>
            <Property label={NS.schema('creator')} />
            <Property label={NS.schema('dateCreated')} />
          </DetailsBar>
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

export default [
  LinkedRenderStore.registerRenderer(
    link([NS.schema('option'), NS.schema('text')], { returnType: 'value' })(VoteSidePage),
    NS.argu('Vote'),
    RENDER_CLASS_NAME,
    NS.argu('voteEventSide')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('option'), NS.schema('text')], { returnType: 'value' })(ThingHoverBoxHidden),
    NS.argu('Vote'),
    RENDER_CLASS_NAME,
    NS.argu('popup')
  ),
];
