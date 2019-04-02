import { actionsBarTopology } from './topologies/ActionsBar/index';
import { appMenuTopology } from './topologies/AppMenu';
import { cardTopology } from './topologies/Card/index';
import { cardAppendixTopology } from './topologies/Card/CardAppendix';
import { cardFixedTopology } from './topologies/Card/CardFixed';
import { cardFloatTopology } from './topologies/Card/CardFloat';
import { cardListTopology } from './topologies/Card/CardList';
import { cardMainTopology } from './topologies/Card/CardMain';
import { cardMicroRowTopology } from './topologies/Card/CardMicroRow';
import { cardRowTopology } from './topologies/Card/CardRow';
import { cardVoteEventTopology } from './topologies/CardVoteEvent/index';
import { containerTopology } from './topologies/Container/index';
import { detailsBarTopology } from './topologies/DetailsBar/index';
import { alertDialogTopology } from './topologies/Dialog/index';
import { dropdownContentTopology } from './topologies/DropdownContent/index';
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
import { popupTopology } from './topologies/Popup/index';
import { selectTopology } from './topologies/Select';
import { tableTopology } from './topologies/Table';
import { tableCellTopology } from './topologies/TableCell';
import { tableRowTopology } from './topologies/TableRow';
import { tabPaneTopology } from './topologies/TabPane/index';
import { tabBarTopology } from './topologies/TabBar/index';
import { voteBubbleTopology } from './topologies/VoteBubble/index';
import { voteEventTopology } from './topologies/VoteEvent/index';
import { voteEventResultTopology } from './topologies/VoteEventResult/index';
import { voteEventSideTopology } from './topologies/VoteEventSide/index';
import { widgetTopologyTopology } from './topologies/WidgetTopology/WidgetTopology';
import { tableHeaderRowTopology } from './topologies/TableHeaderRow';

export const allTopologies = [
  undefined,
  actionsBarTopology,
  appMenuTopology,
  cardTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardListTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  cardVoteEventTopology,
  containerTopology,
  detailsBarTopology,
  alertDialogTopology,
  dropdownContentTopology,
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
  selectTopology,
  tableHeaderRowTopology,
  tableTopology,
  tableRowTopology,
  tableCellTopology,
  tabPaneTopology,
  tabBarTopology,
  voteBubbleTopology,
  voteEventTopology,
  voteEventResultTopology,
  voteEventSideTopology,
  widgetTopologyTopology,
];

export function allTopologiesExcept(...topologies) {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.indexOf(t);
    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export const getTopologyNumber = topology => allTopologies.findIndex((item) => {
  if (item) {
    return item.term === topology.term;
  }
  return topology === item;
});
