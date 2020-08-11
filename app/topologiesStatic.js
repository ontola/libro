import rdf from '@ontologies/core';

import actionsBarTopologyComponent, { actionsBarTopology } from './topologies/ActionsBar';
import appMenuTopologyComponent, { appMenuTopology } from './topologies/AppMenu';
import attributeListTopologyComponent, { attributeListTopology } from './topologies/AttributeList';
import cardTopologyComponent, { cardTopology } from './topologies/Card';
import cardAppendixTopologyComponent, { cardAppendixTopology } from './topologies/Card/CardAppendix';
import cardFixedTopologyComponent, { cardFixedTopology } from './topologies/Card/CardFixed';
import cardFloatTopologyComponent, { cardFloatTopology } from './topologies/Card/CardFloat';
import cardListTopologyComponent, { cardListTopology } from './topologies/Card/CardList';
import cardMainTopologyComponent, { cardMainTopology } from './topologies/Card/CardMain';
import cardMicroRowTopologyComponent, { cardMicroRowTopology } from './topologies/Card/CardMicroRow';
import cardRowTopologyComponent, { cardRowTopology } from './topologies/Card/CardRow';
import containerTopologyComponent, { containerTopology } from './topologies/Container';
import containerFloatTopologyComponent, { containerFloatTopology } from './topologies/Container/ContainerFloat';
import contentDetailsTopologyComponent, { contentDetailsTopology } from './topologies/ContentDetails';
import detailsBarTopologyComponent, { detailsBarTopology } from './topologies/DetailsBar';
import alertDialogTopologyComponent, { alertDialogTopology } from './topologies/Dialog';
import formFooterTopologyComponent, { formFooterTopology } from './topologies/FormFooter/Footer';
import fullResourceTopologyComponent, { fullResourceTopology } from './topologies/FullResource';
import gridTopologyComponent, { gridTopology } from './topologies/Grid';
import hoverBoxTopologyComponent from './topologies/HoverBox';
import { inlineTopology } from './topologies/Inline';
import menuTopologyComponent, { menuTopology } from './topologies/Menu';
import navbarTopologyComponent, { navbarTopology } from './topologies/Navbar';
import omniformFieldsTopologyComponent, { omniformFieldsTopology } from './topologies/OmniformFields/OmniformFields';
import omniformSupplementBarTopologyComponent, { omniformSupplementBarTopology } from './topologies/OmniformSupplementBar/OmniformSupplementBar';
import { pageTopology, Page as pageTopologyComponent } from './topologies/Page';
import pageHeaderTopologyComponent, { pageHeaderTopology } from './topologies/PageHeader';
import parentTopologyComponent, { parentTopology } from './topologies/Parent';
import popupTopologyComponent, { popupTopology } from './topologies/Popup';
import { primaryCallToActionTopology, PrimaryCallToAction as primaryCallToActionTopologyComponent } from './topologies/PrimaryCallToAction';
import radioGroupTopologyComponent, { radioGroupTopology } from './topologies/RadioGroup';
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

export default {
  [rdf.id(actionsBarTopology)]: actionsBarTopologyComponent,
  [rdf.id(appMenuTopology)]: appMenuTopologyComponent,
  [rdf.id(attributeListTopology)]: attributeListTopologyComponent,
  [rdf.id(cardTopology)]: cardTopologyComponent,
  [rdf.id(cardAppendixTopology)]: cardAppendixTopologyComponent,
  [rdf.id(cardFixedTopology)]: cardFixedTopologyComponent,
  [rdf.id(cardFloatTopology)]: cardFloatTopologyComponent,
  [rdf.id(cardListTopology)]: cardListTopologyComponent,
  [rdf.id(cardMainTopology)]: cardMainTopologyComponent,
  [rdf.id(cardMicroRowTopology)]: cardMicroRowTopologyComponent,
  [rdf.id(cardRowTopology)]: cardRowTopologyComponent,
  [rdf.id(containerTopology)]: containerTopologyComponent,
  [rdf.id(containerFloatTopology)]: containerFloatTopologyComponent,
  [rdf.id(contentDetailsTopology)]: contentDetailsTopologyComponent,
  [rdf.id(detailsBarTopology)]: detailsBarTopologyComponent,
  [rdf.id(alertDialogTopology)]: alertDialogTopologyComponent,
  [rdf.id(menuTopology)]: formFooterTopologyComponent,
  [rdf.id(formFooterTopology)]: fullResourceTopologyComponent,
  [rdf.id(fullResourceTopology)]: gridTopologyComponent,
  [rdf.id(gridTopology)]: hoverBoxTopologyComponent,
  [rdf.id(inlineTopology)]: menuTopologyComponent,
  [rdf.id(navbarTopology)]: navbarTopologyComponent,
  [rdf.id(omniformFieldsTopology)]: omniformFieldsTopologyComponent,
  [rdf.id(omniformSupplementBarTopology)]: omniformSupplementBarTopologyComponent,
  [rdf.id(pageTopology)]: pageTopologyComponent,
  [rdf.id(pageHeaderTopology)]: pageHeaderTopologyComponent,
  [rdf.id(parentTopology)]: parentTopologyComponent,
  [rdf.id(primaryCallToActionTopology)]: popupTopologyComponent,
  [rdf.id(popupTopology)]: primaryCallToActionTopologyComponent,
  [rdf.id(radioGroupTopology)]: radioGroupTopologyComponent,
  [rdf.id(selectTopology)]: selectTopologyComponent,
  [rdf.id(tableBodyTopology)]: tableBodyComponent,
  // TODO: Investigate
  [rdf.id(tableCellTopology)]: tabBarTopologyComponent,
  [rdf.id(tableHeaderCellTopology)]: tableTopologyComponent,
  [rdf.id(tableHeaderRowTopology)]: tableCellTopologyComponent,
  [rdf.id(tableFooterCellTopology)]: tableFooterCellTopologyComponent,
  [rdf.id(tableFooterRowTopology)]: tableFooterRowTopologyComponent,
  [rdf.id(tableRowTopology)]: tableHeaderCellTopologyComponent,
  [rdf.id(tableTopology)]: tableHeaderRowTopologyComponent,
  [rdf.id(tabBarTopology)]: tableRowTopologyComponent,
  [rdf.id(tabPaneTopology)]: tabPaneTopologyComponent,
};
