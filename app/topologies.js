import { actionsBarTopology } from './topologies/ActionsBar/index';
import { cardTopology } from './topologies/Card/index';
import { cardAppendixTopology } from './topologies/Card/CardAppendix';
import { cardFixedTopology } from './topologies/Card/CardFixed';
import { cardFloatTopology } from './topologies/Card/CardFloat';
import { cardListTopology } from './topologies/Card/CardList';
import { cardMainTopology } from './topologies/Card/CardMain';
import { cardMicroRowTopology } from './topologies/Card/CardMicroRow';
import { cardRowTopology } from './topologies/Card/CardRow';
import { cardVoteEventTopology } from './topologies/CardVoteEvent/index';
import { collectionTopology } from './topologies/Collection/index';
import { containerTopology } from './topologies/Container/index';
import { detailsBarTopology } from './topologies/DetailsBar/index';
import { dropdownContentTopology } from './topologies/DropdownContent/index';
import { formFooterTopology } from './topologies/FormFooter/Footer';
import { gridTopology } from './topologies/Grid/index';
import { hoverBoxTopology } from './topologies/HoverBox/index';
import { inlineTopology } from './topologies/Inline/index';
import { omniformFieldsTopology } from './topologies/OmniformFields/OmniformFields';
import { pageHeaderTopology } from './topologies/PageHeader/index';
import { parentTopology } from './topologies/Parent/index';
import { popupTopology } from './topologies/Popup/index';
import { sidebarTopology } from './topologies/Sidebar/index';
import { tabBarTopology } from './topologies/TabBar/index';
import { voteBubbleTopology } from './topologies/VoteBubble/index';
import { voteEventTopology } from './topologies/VoteEvent/index';
import { voteEventResult } from './topologies/VoteEventResult/index';
import { voteEventSide } from './topologies/VoteEventSide/index';
import { widgetTopologyTopology } from './topologies/WidgetTopology/WidgetTopology';

export const allTopologies = [
  undefined,
  actionsBarTopology,
  cardTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardListTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  cardVoteEventTopology,
  collectionTopology,
  containerTopology,
  detailsBarTopology,
  dropdownContentTopology,
  formFooterTopology,
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  omniformFieldsTopology,
  parentTopology,
  pageHeaderTopology,
  popupTopology,
  sidebarTopology,
  tabBarTopology,
  voteBubbleTopology,
  voteEventTopology,
  voteEventResult,
  voteEventSide,
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
