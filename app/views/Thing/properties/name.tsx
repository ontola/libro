import * as as from '@ontologies/as';
import * as dcterms from '@ontologies/dcterms';
import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import LinkedRenderStore from 'link-lib';
import {
  PropertyProps,
  link,
  useLink,
  value,
} from 'link-redux';
import React from 'react';

import ActionButton from '../../../components/ActionButton';
import Heading, { HeadingSize, HeadingVariant } from '../../../components/Heading';
import LDLink from '../../../components/LDLink';
import { LinkTarget } from '../../../components/Link';
import { actionsBarTopology } from '../../../topologies/ActionsBar';
import { attributeListTopology } from '../../../topologies/AttributeList';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { containerFloatTopology } from '../../../topologies/Container/ContainerFloat';
import { containerHeaderTopology } from '../../../topologies/Container/ContainerHeader';
import { footerTopology } from '../../../topologies/Footer';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { inlineTopology } from '../../../topologies/Inline';
import { navbarTopology } from '../../../topologies/Navbar';
import { pageHeaderTopology } from '../../../topologies/PageHeader';
import { parentTopology } from '../../../topologies/Parent';
import { radioGroupTopology } from '../../../topologies/RadioGroup';
import { selectTopology } from '../../../topologies/Select';
import { tableRowTopology } from '../../../topologies/TableRow';

export const namePredicates = [
  schema.name,
  as.name,
  rdfs.label,
  foaf.name,
  sh.name,
  dcterms.title,
];

interface ColoredHeadingProps {
  size?: HeadingSize;
  variant?: HeadingVariant;
}

interface WrapperProps {
  wrapper: React.ElementType;
}

const propsMap = {
  name: value(namePredicates),
  type: value(rdfx.type),
};

const ColoredHeading = ({
  size,
  variant,
}: ColoredHeadingProps) => {
  const {
    name,
    type,
  } = useLink(propsMap);

  return (
    <Heading
      size={size}
      type={type}
      variant={variant}
    >
      {name}
    </Heading>
  );
};

export default [
  LinkedRenderStore.registerRenderer(
    () => (
      <ColoredHeading
        data-test="Thing-name-small-title"
        size={HeadingSize.XL}
      />
    ),
    schema.Thing,
    namePredicates,
    fullResourceTopology,
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <LDLink target={LinkTarget.Modal}>
        <ColoredHeading
          data-test="Thing-name-card-preview"
          size={HeadingSize.SM}
          variant={HeadingVariant.Semantic}
        />
      </LDLink>
    ),
    schema.Thing,
    namePredicates,
    hoverBoxTopology,
  ),
  LinkedRenderStore.registerRenderer(
    link({ name: schema.name })(ActionButton),
    schema.Thing,
    namePredicates,
    [
      actionsBarTopology,
      cardFloatTopology,
      cardListTopology,
      containerFloatTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }: PropertyProps) => (
      <Heading
        size={HeadingSize.MD}
        variant={HeadingVariant.Navbar}
      >
        {linkedProp.value}
      </Heading>
    ),
    schema.Thing,
    namePredicates,
    footerTopology,
  ),
  LinkedRenderStore.registerRenderer(
    ({ size }: { size: HeadingSize }) => (
      <ColoredHeading
        data-test="Thing-name-card-main"
        size={size || HeadingSize.XL}
        variant={HeadingVariant.Semantic}
      />
    ),
    schema.Thing,
    namePredicates,
    cardMainTopology,
  ),
  LinkedRenderStore.registerRenderer(
    ({ wrapper }: WrapperProps) => {
      const Wrapper = wrapper || LDLink;

      return (
        <Wrapper>
          <ColoredHeading
            data-test="Thing-name-card-link"
            size={HeadingSize.LG}
            variant={HeadingVariant.Semantic}
          />
        </Wrapper>
      );
    },
    schema.Thing,
    namePredicates,
    [
      cardTopology,
      cardRowTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    ({ wrapper }: WrapperProps) => {
      const Wrapper = wrapper || LDLink;

      return (
        <Wrapper>
          <ColoredHeading
            data-test="Thing-name-card-link"
            size={HeadingSize.LG}
          />
        </Wrapper>
      );
    },
    schema.Thing,
    namePredicates,
    [
      containerTopology,
      containerHeaderTopology,
      gridTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <ColoredHeading
        data-test="Thing-name-card-fixed"
        size={HeadingSize.LG}
        variant={HeadingVariant.Semantic}
      />
    ),
    schema.Thing,
    namePredicates,
    cardFixedTopology,
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }: PropertyProps) => (
      <span data-test="Thing-name-inline">
        {linkedProp.value}
      </span>
    ),
    schema.Thing,
    namePredicates,
    [
      attributeListTopology,
      inlineTopology,
      navbarTopology,
      parentTopology,
      radioGroupTopology,
      selectTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <LDLink>
        <ColoredHeading
          size={HeadingSize.SM}
          variant={HeadingVariant.Semantic}
        />
      </LDLink>
    ),
    schema.Thing,
    namePredicates,
    tableRowTopology,
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }: PropertyProps) => (
      <Heading
        data-test="Thing-name-header"
        size={HeadingSize.XL}
      >
        {linkedProp.value}
      </Heading>
    ),
    schema.Thing,
    namePredicates,
    pageHeaderTopology,
  ),
];
