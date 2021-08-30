import rdf from '@ontologies/core';
import { MapDataToPropsParam } from 'link-redux';
import { ComponentClass, FunctionComponent } from 'react';

import flowTopologyComponent, { flowTopology } from './modules/Flow/topologies/Flow';
import actionsBarTopologyComponent, { actionsBarTopology } from './topologies/ActionsBar';
import appMenuTopologyComponent, { appMenuTopology } from './topologies/AppMenu';
import attributeListTopologyComponent, { attributeListTopology } from './topologies/AttributeList';
import cardTopologyComponent, { cardTopology } from './topologies/Card';
import cardAppendixTopologyComponent, { cardAppendixTopology } from './topologies/Card/CardAppendix';
import cardFixedTopologyComponent, { cardFixedTopology } from './topologies/Card/CardFixed';
import cardFloatTopologyComponent, { cardFloatTopology } from './topologies/Card/CardFloat';
import cardMainTopologyComponent, { cardMainTopology } from './topologies/Card/CardMain';
import cardMicroRowTopologyComponent, { cardMicroRowTopology } from './topologies/Card/CardMicroRow';
import cardRowTopologyComponent, { cardRowTopology } from './topologies/Card/CardRow';
import containerTopologyComponent, { containerTopology } from './topologies/Container';
import containerFloatTopologyComponent, { containerFloatTopology } from './topologies/Container/ContainerFloat';
import containerHeaderTopologyComponent, { containerHeaderTopology } from './topologies/Container/ContainerHeader';
import contentDetailsTopologyComponent, { contentDetailsTopology } from './topologies/ContentDetails';
import detailsBarTopologyComponent, { detailsBarTopology } from './topologies/DetailsBar';
import alertDialogTopologyComponent, { alertDialogTopology } from './topologies/Dialog';
import formFooterTopologyComponent, { formFooterTopology } from './topologies/FormFooter';
import fullResourceTopologyComponent, { fullResourceTopology } from './topologies/FullResource';
import gridTopologyComponent, { gridTopology } from './topologies/Grid';
import hoverBoxTopologyComponent from './topologies/HoverBox';
import { inlineTopology } from './topologies/Inline';
import listTopologyComponent, { listTopology } from './topologies/List';
import menuTopologyComponent, { menuTopology } from './topologies/Menu';
import navbarTopologyComponent, { navbarTopology } from './topologies/Navbar';
import omniformFieldsTopologyComponent, { omniformFieldsTopology } from './topologies/OmniformFields/OmniformFields';
import omniformSupplementBarTopologyComponent, { omniformSupplementBarTopology } from './topologies/OmniformSupplementBar/OmniformSupplementBar';
import { pageTopology, Page as pageTopologyComponent } from './topologies/Page';
import pageHeaderTopologyComponent, { pageHeaderTopology } from './topologies/PageHeader';
import parentTopologyComponent, { parentTopology } from './topologies/Parent';
import radioGroupTopologyComponent, { radioGroupTopology } from './topologies/RadioGroup';
import blueBlockTopologyComponent, { blueBlockTopology } from './topologies/SalesWebsite/BlueBlock';
import selectTopologyComponent, { selectTopology } from './topologies/Select';
import tabBarTopologyComponent, { tabBarTopology } from './topologies/TabBar';
import tableTopologyComponent, { tableTopology } from './topologies/Table';
import tableBodyComponent, { tableBodyTopology } from './topologies/TableBody';
import tableCellTopologyComponent, { tableCellTopology } from './topologies/TableCell';
import tableFooterCellTopologyComponent, { tableFooterCellTopology } from './topologies/TableFooterCell';
import tableFooterRowTopologyComponent, { tableFooterRowTopology } from './topologies/TableFooterRow';
import tableHeaderCellTopologyComponent, { tableHeaderCellTopology } from './topologies/TableHeaderCell';
import tableHeaderRowTopologyComponent, { tableHeaderRowTopology } from './topologies/TableHeaderRow';
import tableRowTopologyComponent, { tableRowTopology } from './topologies/TableRow';
import tabPaneTopologyComponent, { tabPaneTopology } from './topologies/TabPane';

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
