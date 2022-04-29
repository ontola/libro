import Tab from '@mui/material/Tab';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { Property, Resource } from 'link-redux';
import React, { MouseEvent } from 'react';

interface DashboardTabBarProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  subject: SomeNode;
  value: string;
}

const DashboardTabBar: React.FC<DashboardTabBarProps> = ({
  subject,
  onClick,
}) => (
  <Tab
    key={subject.value}
    label={(
      <Resource subject={subject}>
        <Property label={schema.name} />
      </Resource>
    )}
    value={subject.value}
    onClick={onClick}
  />
);

export default DashboardTabBar;
