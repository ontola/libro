import rdf from '@ontologies/core';
import { MapDataToPropsParam } from 'link-redux';
import { ComponentClass, FunctionComponent } from 'react';

import flowTopologyComponent from './modules/Flow/topologies/Flow';
import {
  actionsBarTopology,
  alertDialogTopology,
  appMenuTopology,
  attributeListTopology,
  blueBlockTopology,
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
  flowTopology,
  formFooterTopology,
  fullResourceTopology,
  gridTopology,
  inlineTopology,
  listTopology,
  mainBodyTopology,
  menuTopology,
  navbarTopology,
  omniformFieldsTopology,
  omniformSupplementBarTopology,
  pageHeaderTopology,
  pageTopology,
  parentTopology,
  radioGroupTopology,
  selectTopology,
  tabBarTopology,
  tabPaneTopology,
  tableBodyTopology,
  tableCellTopology,
  tableFooterCellTopology,
  tableFooterRowTopology,
  tableHeaderCellTopology,
  tableHeaderRowTopology,
  tableRowTopology,
  tableTopology,
} from './topologies';
import actionsBarTopologyComponent from './topologies/ActionsBar';
import appMenuTopologyComponent from './topologies/AppMenu';
import attributeListTopologyComponent from './topologies/AttributeList';
import cardTopologyComponent from './topologies/Card';
import cardAppendixTopologyComponent from './topologies/Card/CardAppendix';
import cardFixedTopologyComponent from './topologies/Card/CardFixed';
import cardFloatTopologyComponent from './topologies/Card/CardFloat';
import cardMainTopologyComponent from './topologies/Card/CardMain';
import cardMicroRowTopologyComponent from './topologies/Card/CardMicroRow';
import cardRowTopologyComponent from './topologies/Card/CardRow';
import containerTopologyComponent from './topologies/Container';
import containerFloatTopologyComponent from './topologies/Container/ContainerFloat';
import containerHeaderTopologyComponent from './topologies/Container/ContainerHeader';
import contentDetailsTopologyComponent from './topologies/ContentDetails';
import detailsBarTopologyComponent from './topologies/DetailsBar';
import alertDialogTopologyComponent from './topologies/Dialog';
import formFooterTopologyComponent from './topologies/FormFooter';
import fullResourceTopologyComponent from './topologies/FullResource';
import gridTopologyComponent from './topologies/Grid';
import hoverBoxTopologyComponent from './topologies/HoverBox';
import listTopologyComponent from './topologies/List';
import mainBodyComponent from './topologies/MainBody';
import menuTopologyComponent from './topologies/Menu';
import navbarTopologyComponent from './topologies/Navbar';
import omniformFieldsTopologyComponent from './topologies/OmniformFields/OmniformFields';
import omniformSupplementBarTopologyComponent from './topologies/OmniformSupplementBar/OmniformSupplementBar';
import { Page as pageTopologyComponent } from './topologies/Page';
import pageHeaderTopologyComponent from './topologies/PageHeader';
import parentTopologyComponent from './topologies/Parent';
import radioGroupTopologyComponent from './topologies/RadioGroup';
import blueBlockTopologyComponent from './topologies/SalesWebsite/BlueBlock';
import selectTopologyComponent from './topologies/Select';
import tabBarTopologyComponent from './topologies/TabBar';
import tableTopologyComponent from './topologies/Table';
import tableBodyComponent from './topologies/TableBody';
import tableCellTopologyComponent from './topologies/TableCell';
import tableFooterCellTopologyComponent from './topologies/TableFooterCell';
import tableFooterRowTopologyComponent from './topologies/TableFooterRow';
import tableHeaderCellTopologyComponent from './topologies/TableHeaderCell';
import tableHeaderRowTopologyComponent from './topologies/TableHeaderRow';
import tableRowTopologyComponent from './topologies/TableRow';
import tabPaneTopologyComponent from './topologies/TabPane';

interface TopologyMap {
  [k: number]: [FunctionComponent<any> | ComponentClass<any>, MapDataToPropsParam | undefined];
}

const topologyMap: TopologyMap = {
  [rdf.id(actionsBarTopology)]: [actionsBarTopologyComponent, undefined],
  [rdf.id(appMenuTopology)]: [appMenuTopologyComponent, undefined],
  [rdf.id(attributeListTopology)]: [attributeListTopologyComponent, undefined],
  [rdf.id(blueBlockTopology)]: [blueBlockTopologyComponent, undefined],
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
  [rdf.id(menuTopology)]: [formFooterTopologyComponent, undefined],
  [rdf.id(flowTopology)]: [flowTopologyComponent, undefined],
  [rdf.id(formFooterTopology)]: [fullResourceTopologyComponent, undefined],
  [rdf.id(fullResourceTopology)]: [gridTopologyComponent, undefined],
  [rdf.id(gridTopology)]: [hoverBoxTopologyComponent, undefined],
  [rdf.id(inlineTopology)]: [menuTopologyComponent, undefined],
  [rdf.id(listTopology)]: [listTopologyComponent, undefined],
  [rdf.id(navbarTopology)]: [navbarTopologyComponent, undefined],
  [rdf.id(omniformFieldsTopology)]: [omniformFieldsTopologyComponent, undefined],
  [rdf.id(omniformSupplementBarTopology)]: [omniformSupplementBarTopologyComponent, undefined],
  [rdf.id(pageTopology)]: [pageTopologyComponent, undefined],
  [rdf.id(pageHeaderTopology)]: [pageHeaderTopologyComponent, undefined],
  [rdf.id(parentTopology)]: [parentTopologyComponent, undefined],
  [rdf.id(radioGroupTopology)]: [radioGroupTopologyComponent, undefined],
  [rdf.id(selectTopology)]: [selectTopologyComponent, undefined],
  [rdf.id(tableBodyTopology)]: [tableBodyComponent, undefined],
  // TODO: Investigate
  [rdf.id(tableCellTopology)]: [tabBarTopologyComponent, undefined],
  [rdf.id(tableHeaderCellTopology)]: [tableTopologyComponent, undefined],
  [rdf.id(tableHeaderRowTopology)]: [tableCellTopologyComponent, undefined],
  [rdf.id(tableFooterCellTopology)]: [tableFooterCellTopologyComponent, undefined],
  [rdf.id(tableFooterRowTopology)]: [tableFooterRowTopologyComponent, undefined],
  [rdf.id(tableRowTopology)]: [tableHeaderCellTopologyComponent, undefined],
  [rdf.id(tableTopology)]: [tableHeaderRowTopologyComponent, undefined],
  [rdf.id(tabBarTopology)]: [tableRowTopologyComponent, undefined],
  [rdf.id(tabPaneTopology)]: [tabPaneTopologyComponent, undefined],
};

export default topologyMap;
