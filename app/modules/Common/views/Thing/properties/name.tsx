import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  PropertyProps,
  useLink,
  value,
} from 'link-redux';
import React from 'react';

import { radioGroupTopology } from '../../../../Form/topologies/RadioGroup';
import { selectTopology } from '../../../../Form/topologies/Select';
import { navbarTopology } from '../../../../NavBar/topologies/Navbar';
import { tableRowTopology } from '../../../../Table/topologies/TableRow';
import Heading, {
  HeadingProps,
  HeadingSize,
  HeadingVariant,
} from '../../../components/Heading';
import LDLink from '../../../components/LDLink';
import { LinkTarget } from '../../../components/Link';
import { namePredicates } from '../../../lib/predicates';
import { inlineTopology } from '../../../topologies';
import { attributeListTopology } from '../../../topologies/AttributeList';
import { parentTopology } from '../../../topologies/BreadcrumbsBar';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { containerHeaderTopology } from '../../../topologies/Container/ContainerHeader';
import { footerTopology } from '../../../topologies/Footer';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { mainBodyTopology } from '../../../topologies/MainBody';
import { pageHeaderTopology } from '../../../topologies/PageHeader';

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
}: HeadingProps) => {
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
    [cardMainTopology, mainBodyTopology],
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
