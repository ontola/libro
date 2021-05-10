import AppBar from '@material-ui/core/AppBar';
import rdf, {
  Literal,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useDataFetching,
  useResourceProperty,
} from 'link-redux';
import React, { useState } from 'react';

import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import { iriFromTemplate } from '../../../helpers/uriTemplate';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import { CardMain } from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import TabBar from '../../../topologies/TabBar';
import TabPane from '../../../topologies/TabPane';

import DasboardTabBar from './DashboardTabBar';
import DateRangeFilter from './DateRangeFilter';
import PostalRangeFilter from './PostalRangeFilter';

export const DATE_SIZE = 2;
const VALID_POSTAL_RANGE_LENGTH = 9;
const ONE_WEEK = 7;

const dateRangeToS = (dateRange: [Date, Date]) => (
  dateRange.map((date: Date) => {
    const dd = date.getDate().toString().padStart(DATE_SIZE, '0');
    const mm = (date.getMonth() + 1).toString().padStart(DATE_SIZE, '0');
    const yyyy = date.getFullYear();

    return yyyy + mm + dd;
  }).join('-')
);

interface PropTypes {
  dashboard: SomeNode;
}

const DashboardPageFull: FC<PropTypes> = ({ dashboard }) => {
  useDataFetching([dashboard]);
  const [itemSequence] = useResourceProperty(dashboard, ontola.menuItems);
  const items = useContainerToArr(isNode(itemSequence) ? itemSequence : undefined);
  const [firstItem] = useResourceProperty(isNode(itemSequence) ? itemSequence : undefined, rdfx.ns('_0'));
  const [currentTab, setCurrentTab] = useState<SomeNode | undefined>(undefined);
  const [iriTemplate] = useResourceProperty(isNode(currentTab) ? currentTab : undefined, ontola.href);
  const currentActorPostalRanges = useResourceProperty(app.c_a, teamGL.postalRanges);
  const [page, setPage] = useState(1);
  const [postalRanges, setPostalRange] = useState<Literal[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>(() => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - ONE_WEEK);

    return [oneWeekAgo, today];
  });

  React.useEffect(() => {
    if (!currentTab && isNode(firstItem)) {
      setCurrentTab(firstItem);
    }
  }, [firstItem]);

  React.useEffect(() => {
    if (postalRanges.length === 0 && currentActorPostalRanges) {
      setPostalRange(
        currentActorPostalRanges.map((range) => (
          rdf.literal(range.value.replace('0-', '0000-'))
        )),
      );
    }
  }, [currentActorPostalRanges]);

  if (!iriTemplate) {
    return null;
  }

  const tabBar = (
    <AppBar color="inherit" elevation={0} position="static">
      <TabBar value={currentTab?.value}>
        {Array.isArray(items) && items.map((item) => (
          isNode(item) && (
            <DasboardTabBar
              key={item.value}
              subject={item}
              value={item.value}
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab(item);
              }}
            />
          )
        ))}
      </TabBar>
    </AppBar>
  );

  const filteredPostalRanges = postalRanges.filter((range) => (
    range.value?.length === VALID_POSTAL_RANGE_LENGTH
  ));

  return (
    <Container>
      <CardMain>
        <CardContent endSpacing>
          <Property label={schema.name} />
          <DateRangeFilter
            dateRange={dateRange}
            label="Toon statistieken uit de postcodes:"
            setDateRange={setDateRange}
          />
          <PostalRangeFilter
            label="Toon statistieken uit de postcodes:"
            postalRanges={postalRanges}
            setPostalRange={setPostalRange}
          />
        </CardContent>
        <CardDivider />
        {tabBar}
      </CardMain>
      <div style={{ marginTop: '1em' }}>
        <TabPane>
          <Resource
            nextPage={() => setPage(page + 1)}
            previousPage={() => setPage(page - 1)}
            subject={iriFromTemplate(iriTemplate.value, {
              date_range: dateRangeToS(dateRange),
              page,
              postal_range: filteredPostalRanges?.map((range) => range.value)?.join(','),
            })}
          />
        </TabPane>
      </div>
    </Container>
  );
};

DashboardPageFull.type = teamGL.DashboardPage;

DashboardPageFull.topology = fullResourceTopology;

DashboardPageFull.mapDataToProps = {
  dashboard: teamGL.dashboard,
};

export default register(DashboardPageFull);
