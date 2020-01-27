import rdf from '@ontologies/core';
import React from 'react';

import Spinner from './components/Spinner';
import { actionsBarTopology } from './topologies/ActionsBar/index';
import { appMenuTopology } from './topologies/AppMenu';
import { attributeListTopology } from './topologies/AttributeList';
import { cardTopology } from './topologies/Card/index';
import { cardAppendixTopology } from './topologies/Card/CardAppendix';
import { cardFixedTopology } from './topologies/Card/CardFixed';
import { cardFloatTopology } from './topologies/Card/CardFloat';
import { cardListTopology } from './topologies/Card/CardList';
import { cardMainTopology } from './topologies/Card/CardMain';
import { cardMicroRowTopology } from './topologies/Card/CardMicroRow';
import { cardRowTopology } from './topologies/Card/CardRow';
import { containerTopology } from './topologies/Container/index';
import { containerFloatTopology } from './topologies/Container/ContainerFloat';
import { contentDetailsTopology } from './topologies/ContentDetails/index';
import { detailsBarTopology } from './topologies/DetailsBar/index';
import { alertDialogTopology } from './topologies/Dialog/index';
import { menuTopology } from './topologies/Menu/index';
import { formFooterTopology } from './topologies/FormFooter/Footer';
import { gridTopology } from './topologies/Grid/index';
import { hoverBoxTopology } from './topologies/HoverBox/index';
import { inlineTopology } from './topologies/Inline/index';
import { navbarTopology } from './topologies/Navbar';
import { omniformFieldsTopology } from './topologies/OmniformFields/OmniformFields';
import { omniformSupplementBarTopology } from './topologies/OmniformSupplementBar/OmniformSupplementBar';
import { pageTopology } from './topologies/Page';
import { pageHeaderTopology } from './topologies/PageHeader/index';
import { parentTopology } from './topologies/Parent/index';
import { primaryCallToActionTopology } from './topologies/PrimaryCallToAction/index';
import { popupTopology } from './topologies/Popup/index';
import { primaryResourceTopology } from './topologies/PrimaryResource';
import { radioGroupTopology } from './topologies/RadioGroup';
import { selectTopology } from './topologies/Select';
import { tableCellTopology } from './topologies/TableCell';
import { tableHeaderCellTopology } from './topologies/TableHeaderCell';
import { tableHeaderRowTopology } from './topologies/TableHeaderRow';
import { tableFooterCellTopology } from './topologies/TableFooterCell';
import { tableFooterRowTopology } from './topologies/TableFooterRow';
import { tableRowTopology } from './topologies/TableRow';
import { tableTopology } from './topologies/Table';
import { tabBarTopology } from './topologies/TabBar/index';
import { tabPaneTopology } from './topologies/TabPane/index';
import { voteBubbleTopology } from './topologies/VoteBubble/index';

const wrap = (LazyComp) => (props) => (
  React.createElement(
    React.Suspense,
    { fallback: React.createElement(Spinner, { loading: true }) },
    React.createElement(LazyComp, props)
  )
);

export const topologyComponentMap = {
  [rdf.id(actionsBarTopology)]: wrap(React.lazy(() => import('./topologies/ActionsBar/index'))),
  [rdf.id(appMenuTopology)]: wrap(React.lazy(() => import('./topologies/AppMenu'))),
  [rdf.id(attributeListTopology)]: wrap(React.lazy(() => import('./topologies/AttributeList'))),
  [rdf.id(cardTopology)]: wrap(React.lazy(() => import('./topologies/Card/index'))),
  [rdf.id(cardAppendixTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardAppendix'))),
  [rdf.id(cardFixedTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardFixed'))),
  [rdf.id(cardFloatTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardFloat'))),
  [rdf.id(cardListTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardList'))),
  [rdf.id(cardMainTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardMain'))),
  [rdf.id(cardMicroRowTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardMicroRow'))),
  [rdf.id(cardRowTopology)]: wrap(React.lazy(() => import('./topologies/Card/CardRow'))),
  [rdf.id(containerTopology)]: wrap(React.lazy(() => import('./topologies/Container/index'))),
  [rdf.id(containerFloatTopology)]: wrap(React.lazy(() => import('./topologies/Container/ContainerFloat'))),
  [rdf.id(contentDetailsTopology)]: wrap(React.lazy(() => import('./topologies/ContentDetails/index'))),
  [rdf.id(detailsBarTopology)]: wrap(React.lazy(() => import('./topologies/DetailsBar/index'))),
  [rdf.id(alertDialogTopology)]: wrap(React.lazy(() => import('./topologies/Dialog/index'))),
  [rdf.id(menuTopology)]: wrap(React.lazy(() => import('./topologies/Menu/index'))),
  [rdf.id(formFooterTopology)]: wrap(React.lazy(() => import('./topologies/FormFooter/Footer'))),
  [rdf.id(gridTopology)]: wrap(React.lazy(() => import('./topologies/Grid/index'))),
  [rdf.id(hoverBoxTopology)]: wrap(React.lazy(() => import('./topologies/HoverBox/index'))),
  [rdf.id(inlineTopology)]: wrap(React.lazy(() => import('./topologies/Inline/index'))),
  [rdf.id(navbarTopology)]: wrap(React.lazy(() => import('./topologies/Navbar'))),
  [rdf.id(omniformFieldsTopology)]: wrap(React.lazy(() => import('./topologies/OmniformFields/OmniformFields'))),
  [rdf.id(omniformSupplementBarTopology)]: wrap(React.lazy(() => import('./topologies/OmniformSupplementBar/OmniformSupplementBar'))),
  [rdf.id(pageTopology)]: wrap(React.lazy(() => import('./topologies/Page'))),
  [rdf.id(pageHeaderTopology)]: wrap(React.lazy(() => import('./topologies/PageHeader/index'))),
  [rdf.id(parentTopology)]: wrap(React.lazy(() => import('./topologies/Parent/index'))),
  [rdf.id(primaryCallToActionTopology)]: wrap(React.lazy(() => import('./topologies/PrimaryCallToAction/index'))),
  [rdf.id(popupTopology)]: wrap(React.lazy(() => import('./topologies/Popup/index'))),
  [rdf.id(primaryResourceTopology)]: wrap(React.lazy(() => import('./topologies/PrimaryResource'))),
  [rdf.id(radioGroupTopology)]: wrap(React.lazy(() => import('./topologies/RadioGroup'))),
  [rdf.id(selectTopology)]: wrap(React.lazy(() => import('./topologies/Select'))),
  [rdf.id(tableCellTopology)]: wrap(React.lazy(() => import('./topologies/TableCell'))),
  [rdf.id(tableHeaderCellTopology)]: wrap(React.lazy(() => import('./topologies/TableHeaderCell'))),
  [rdf.id(tableHeaderRowTopology)]: wrap(React.lazy(() => import('./topologies/TableHeaderRow'))),
  [rdf.id(tableFooterCellTopology)]: wrap(React.lazy(() => import('./topologies/TableFooterCell'))),
  [rdf.id(tableFooterRowTopology)]: wrap(React.lazy(() => import('./topologies/TableFooterRow'))),
  [rdf.id(tableRowTopology)]: wrap(React.lazy(() => import('./topologies/TableRow'))),
  [rdf.id(tableTopology)]: wrap(React.lazy(() => import('./topologies/Table'))),
  [rdf.id(tabBarTopology)]: wrap(React.lazy(() => import('./topologies/TabBar/index'))),
  [rdf.id(tabPaneTopology)]: wrap(React.lazy(() => import('./topologies/TabPane/index'))),
  [rdf.id(voteBubbleTopology)]: wrap(React.lazy(() => import('./topologies/VoteBubble/index'))),
};

export const allTopologies = [
  undefined,
  actionsBarTopology,
  appMenuTopology,
  attributeListTopology,
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
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  navbarTopology,
  omniformFieldsTopology,
  omniformSupplementBarTopology,
  parentTopology,
  pageTopology,
  pageHeaderTopology,
  popupTopology,
  primaryCallToActionTopology,
  radioGroupTopology,
  selectTopology,
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

export function allTopologiesExcept(...topologies) {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.findIndex((f) => rdf.equals(f, t));
    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export const getTopologyNumber = (topology) => allTopologies
  .findIndex((item) => rdf.equals(topology, item));
