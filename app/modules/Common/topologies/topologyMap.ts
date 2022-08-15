import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import attributeListTopologyComponent from './AttributeList';
import breadcrumbTopologyComponent from './BreadcrumbsBar';
import cardTopologyComponent from './Card';
import cardAppendixTopologyComponent from './Card/CardAppendix';
import cardFixedTopologyComponent from './Card/CardFixed';
import cardFloatTopologyComponent from './Card/CardFloat';
import cardMainTopologyComponent from './Card/CardMain';
import cardMicroRowTopologyComponent from './Card/CardMicroRow';
import cardRowTopologyComponent from './Card/CardRow';
import containerTopologyComponent from './Container';
import containerFloatTopologyComponent from './Container/ContainerFloat';
import containerHeaderTopologyComponent from './Container/ContainerHeader';
import contentDetailsTopologyComponent from './ContentDetails';
import detailsBarTopologyComponent from './DetailsBar';
import alertDialogTopologyComponent from './Dialog';
import footerTopologyComponent from './Footer';
import fullResourceTopologyComponent from './FullResource';
import gridTopologyComponent from './Grid';
import hoverBoxTopologyComponent from './HoverBox';
import listTopologyComponent from './List';
import mainBodyComponent from './MainBody';
import pageTopologyComponent from './Page';
import pageHeaderTopologyComponent from './PageHeader';
import tabBarTopologyComponent from './TabBar';
import tabPaneTopologyComponent from './TabPane';

import {
  alertDialogTopology,
  attributeListTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  cardTopology,
  containerFloatTopology,
  containerHeaderTopology,
  containerTopology,
  contentDetailsTopology,
  detailsBarTopology,
  footerTopology,
  fullResourceTopology,
  gridTopology,
  hoverBoxTopology,
  listTopology,
  mainBodyTopology,
  pageHeaderTopology,
  pageTopology,
  parentTopology,
  tabBarTopology,
  tabPaneTopology,
} from './index';

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
