import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  PropertyBase,
  linkedPropType,
  subjectType,
  withLinkCtx,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  CollapseText,
  Markdown,
  MarkdownFixedPreview,
} from '../../../components';
import ontola from '../../../ontology/ontola';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { popupTopology } from '../../../topologies/Popup';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { widgetTopologyTopology } from '../../../topologies/WidgetTopology/WidgetTopology';

const propTypes = {
  linkedProp: linkedPropType,
};

const Text = ({ linkedProp }) => <Markdown data-test="Thing-text" text={linkedProp.value} />;

Text.propTypes = propTypes;

const TextInline = ({ linkedProp }) => (
  <Markdown
    inline
    data-test="Thing-text"
    text={linkedProp.value}
  />
);

TextInline.propTypes = propTypes;

/**
 * Only displays text when there is no cover image, and does not overflow.
 * Note: It doesn't render inline anchor elements since it should always be wrapped in an outer
 * anchor.
 */
class TextCutoff extends PropertyBase {
  render() {
    if (!this.getLinkedObjectProperty() || this.getLinkedObjectProperty(ontola.coverPhoto)) {
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
  noSpacing: PropTypes.bool,
  subject: subjectType,
};

const TextCollapsed = ({
  linkedProp,
  noSpacing,
  subject,
}) => (
  <CollapseText
    data-test="Thing-text-card"
    id={subject.value}
    noSpacing={noSpacing}
    text={linkedProp.value}
  />
);

TextCollapsed.propTypes = propTypesCollection;

export default [
  LinkedRenderStore.registerRenderer(
    Text,
    schema.Thing,
    [schema.text, schema.description],
    [
      primaryResourceTopology,
      cardMainTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(TextCollapsed),
    schema.Thing,
    [schema.text, schema.description],
    [
      cardRowTopology,
      cardTopology,
      containerTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    TextInline,
    schema.Thing,
    [schema.text, schema.description],
    cardListTopology
  ),
  LinkedRenderStore.registerRenderer(
    TextCutoff,
    schema.Thing,
    [schema.text, schema.description],
    [
      cardFixedTopology,
      hoverBoxTopology,
      popupTopology,
    ]
  ),
];
