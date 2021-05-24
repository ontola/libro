import rdf, { NamedNode } from '@ontologies/core';

import { actionsBarTopology } from './topologies/ActionsBar';
import { appMenuTopology } from './topologies/AppMenu';
import { attributeListTopology } from './topologies/AttributeList';
import { cardTopology } from './topologies/Card';
import { cardAppendixTopology } from './topologies/Card/CardAppendix';
import { cardFixedTopology } from './topologies/Card/CardFixed';
import { cardFloatTopology } from './topologies/Card/CardFloat';
import { cardListTopology } from './topologies/Card/CardList';
import { cardMainTopology } from './topologies/Card/CardMain';
import { cardMicroRowTopology } from './topologies/Card/CardMicroRow';
import { cardRowTopology } from './topologies/Card/CardRow';
import { containerTopology } from './topologies/Container';
import { containerFloatTopology } from './topologies/Container/ContainerFloat';
import { contentDetailsTopology } from './topologies/ContentDetails';
import { detailsBarTopology } from './topologies/DetailsBar';
import { alertDialogTopology } from './topologies/Dialog';
import { footerTopology } from './topologies/Footer';
import { formFooterTopology } from './topologies/FormFooter/Footer';
import { fullResourceTopology } from './topologies/FullResource';
import { gridTopology } from './topologies/Grid';
import { hoverBoxTopology } from './topologies/HoverBox';
import { inlineTopology } from './topologies/Inline';
import { menuTopology } from './topologies/Menu';
import { navbarTopology } from './topologies/Navbar';
import { omniformFieldsTopology } from './topologies/OmniformFields/OmniformFields';
import { omniformSupplementBarTopology } from './topologies/OmniformSupplementBar/OmniformSupplementBar';
import { pageTopology } from './topologies/Page';
import { pageHeaderTopology } from './topologies/PageHeader';
import { parentTopology } from './topologies/Parent';
import { radioGroupTopology } from './topologies/RadioGroup';
import { blueBlockTopology } from './topologies/SalesWebsite/BlueBlock';
import { selectTopology } from './topologies/Select';
import { selectedValueTopology } from './topologies/SelectedValue';
import { showcaseTopology } from './topologies/Showcase';
import { sideBarTopology } from './topologies/SideBar';
import { tableBodyTopology } from './topologies/TableBody';
import { tableCellTopology } from './topologies/TableCell';
import { tableHeaderCellTopology } from './topologies/TableHeaderCell';
import { tableHeaderRowTopology } from './topologies/TableHeaderRow';
import { tableFooterCellTopology } from './topologies/TableFooterCell';
import { tableFooterRowTopology } from './topologies/TableFooterRow';
import { tableRowTopology } from './topologies/TableRow';
import { tableTopology } from './topologies/Table';
import { tabBarTopology } from './topologies/TabBar';
import { tabPaneTopology } from './topologies/TabPane';
import { voteBubbleTopology } from './topologies/VoteBubble';

export { default as topologyComponentMap } from './topologiesStatic';

export const allTopologies: NamedNode[] = [
  undefined as unknown as NamedNode,
  actionsBarTopology,
  appMenuTopology,
  attributeListTopology,
  blueBlockTopology,
  cardTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardListTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  containerTopology,
  containerFloatTopology,
  contentDetailsTopology,
  detailsBarTopology,
  alertDialogTopology,
  menuTopology,
  formFooterTopology,
  footerTopology,
  fullResourceTopology,
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  navbarTopology,
  omniformFieldsTopology,
  omniformSupplementBarTopology,
  parentTopology,
  pageTopology,
  pageHeaderTopology,
  radioGroupTopology,
  selectTopology,
  selectedValueTopology,
  showcaseTopology,
  sideBarTopology,
  tableBodyTopology,
  tableHeaderCellTopology,
  tableHeaderRowTopology,
  tableFooterCellTopology,
  tableFooterRowTopology,
  tableTopology,
  tableRowTopology,
  tableCellTopology,
  tabPaneTopology,
  tabBarTopology,
  voteBubbleTopology,
];

export function allTopologiesExcept(...topologies: NamedNode[]): NamedNode[] {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.findIndex((f) => rdf.equals(f, t));
    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export const getTopologyNumber = (topology?: NamedNode): number => allTopologies
  .findIndex((item) => rdf.equals(topology, item));
