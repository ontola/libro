import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';
import libro from '../../Kernel/ontology/libro';

import attributeListTopologyComponent, { attributeListTopology } from './AttributeList';
import breadcrumbTopologyComponent, { parentTopology } from './BreadcrumbsBar';
import cardTopologyComponent, { cardTopology } from './Card';
import cardAppendixTopologyComponent, { cardAppendixTopology } from './Card/CardAppendix';
import cardFixedTopologyComponent, { cardFixedTopology } from './Card/CardFixed';
import cardFloatTopologyComponent, { cardFloatTopology } from './Card/CardFloat';
import cardMainTopologyComponent, { cardMainTopology } from './Card/CardMain';
import cardMicroRowTopologyComponent, { cardMicroRowTopology } from './Card/CardMicroRow';
import cardRowTopologyComponent, { cardRowTopology } from './Card/CardRow';
import containerTopologyComponent, { containerTopology } from './Container';
import containerFloatTopologyComponent, { containerFloatTopology } from './Container/ContainerFloat';
import containerHeaderTopologyComponent, { containerHeaderTopology } from './Container/ContainerHeader';
import contentDetailsTopologyComponent, { contentDetailsTopology } from './ContentDetails';
import detailsBarTopologyComponent, { detailsBarTopology } from './DetailsBar';
import alertDialogTopologyComponent, { alertDialogTopology } from './Dialog';
import footerTopologyComponent, { footerTopology } from './Footer';
import fullResourceTopologyComponent, { fullResourceTopology } from './FullResource';
import gridTopologyComponent, { gridTopology } from './Grid';
import hoverBoxTopologyComponent, { hoverBoxTopology } from './HoverBox';
import listTopologyComponent, { listTopology } from './List';
import mainBodyComponent, { mainBodyTopology } from './MainBody';
import pageTopologyComponent, { pageTopology } from './Page';
import pageHeaderTopologyComponent, { pageHeaderTopology } from './PageHeader';
import { sideBarTopology } from './SideBar';
import tabBarTopologyComponent, { tabBarTopology } from './TabBar';
import tabPaneTopologyComponent, { tabPaneTopology } from './TabPane';

export const inlineTopology = libro.topologies.inline;

export const topologyMap: TopologyMap = {
  [rdf.id(attributeListTopology)]: [attributeListTopologyComponent, undefined],
  [rdf.id(cardTopology)]: [cardTopologyComponent, undefined],
  [rdf.id(cardAppendixTopology)]: [cardAppendixTopologyComponent, undefined],
  [rdf.id(cardFixedTopology)]: [cardFixedTopologyComponent, undefined],
  [rdf.id(cardFloatTopology)]: [cardFloatTopologyComponent, undefined],
  [rdf.id(cardMainTopology)]: [cardMainTopologyComponent, undefined],
  [rdf.id(cardMicroRowTopology)]: [cardMicroRowTopologyComponent, undefined],
  [rdf.id(cardRowTopology)]: [cardRowTopologyComponent, undefined],
  [rdf.id(containerTopology)]: [containerTopologyComponent, undefined],
  [rdf.id(containerFloatTopology)]: [containerFloatTopologyComponent, undefined],
  [rdf.id(containerHeaderTopology)]: [containerHeaderTopologyComponent, undefined],
  [rdf.id(contentDetailsTopology)]: [contentDetailsTopologyComponent, undefined],
  [rdf.id(detailsBarTopology)]: [detailsBarTopologyComponent, undefined],
  [rdf.id(alertDialogTopology)]: [alertDialogTopologyComponent, undefined],
  [rdf.id(mainBodyTopology)]: [mainBodyComponent, undefined],
  [rdf.id(footerTopology)]: [footerTopologyComponent, undefined],
  [rdf.id(fullResourceTopology)]: [fullResourceTopologyComponent, undefined],
  [rdf.id(gridTopology)]: [gridTopologyComponent, undefined],
  [rdf.id(hoverBoxTopology)]: [hoverBoxTopologyComponent, undefined],
  [rdf.id(listTopology)]: [listTopologyComponent, undefined],
  [rdf.id(pageTopology)]: [pageTopologyComponent, undefined],
  [rdf.id(pageHeaderTopology)]: [pageHeaderTopologyComponent, undefined],
  [rdf.id(parentTopology)]: [breadcrumbTopologyComponent, undefined],
  [rdf.id(tabBarTopology)]: [tabBarTopologyComponent, undefined],
  [rdf.id(tabPaneTopology)]: [tabPaneTopologyComponent, undefined],
};

export default [
  alertDialogTopology,
  attributeListTopology,
  cardTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  containerTopology,
  containerFloatTopology,
  containerHeaderTopology,
  contentDetailsTopology,
  detailsBarTopology,
  footerTopology,
  fullResourceTopology,
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  listTopology,
  mainBodyTopology,
  pageTopology,
  pageHeaderTopology,
  parentTopology,
  sideBarTopology,
  tabBarTopology,
  tabPaneTopology,
];
