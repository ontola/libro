import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  subjectType,
  PropertyBase,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { CollapseText, Markdown, MarkdownFixedPreview } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { popupTopology } from '../../../topologies/Popup';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

const propTypes = {
  linkedProp: linkedPropType,
};

const Text = ({ linkedProp }) => <Markdown data-test="Thing-text" text={linkedProp.value} />;

Text.propTypes = propTypes;

const TextInline = ({ linkedProp }) => <Markdown inline data-test="Thing-text" text={linkedProp.value} />;

TextInline.propTypes = propTypes;

/** Only displays text when there is no cover image, and does not overflow. */
class TextCutoff extends PropertyBase {
  render() {
    if (!this.getLinkedObjectProperty() || this.getLinkedObjectProperty(NS.argu('coverPhoto'))) {
      return null;
    }
    return (
      <MarkdownFixedPreview text={this.getLinkedObjectProperty().value} />
    );
  }
}

TextCutoff.propTypes = propTypes;

const propTypesCollection = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

const TextCollapsed = ({ linkedProp, subject }) => <CollapseText data-test="Thing-text-card" id={subject.value} text={linkedProp.value} />;

TextCollapsed.propTypes = propTypesCollection;

export default [
  LinkedRenderStore.registerRenderer(
    Text,
    NS.schema('Thing'),
    NS.schema('text'),
    [
      primaryResourceTopology,
      cardMainTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(TextCollapsed),
    NS.schema('Thing'),
    NS.schema('text'),
    [
      cardRowTopology,
      cardTopology,
      containerTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    TextInline,
    NS.schema('Thing'),
    NS.schema('text'),
    cardListTopology
  ),
  LinkedRenderStore.registerRenderer(
    TextCutoff,
    NS.schema('Thing'),
    NS.schema('text'),
    [
      cardFixedTopology,
      hoverBoxTopology,
      popupTopology,
    ]
  ),
];
