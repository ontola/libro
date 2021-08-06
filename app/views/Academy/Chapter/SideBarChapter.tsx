import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import { SomeNode } from 'link-lib';
import React from 'react';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as rdfs from '@ontologies/rdfs';
import FontAwesome from 'react-fontawesome';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import argu from '../../../ontology/argu';
import { sideBarTopology } from '../../../topologies/SideBar';
import { LibroTheme } from '../../../themes/themes';

const ICON_PADDING = 3;

export interface SideBarChapterProps {
  topLevel?: boolean;
  completedChapters: Set<string>;
  currentChapter: SomeTerm;
  onChapterChange: (subject: SomeTerm) => void;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  activeTitle: {
    color: `${theme.palette.primary.main} !important`,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  iconCompleted: {
    color: '#6EB384',
    flexGrow: 1,
    textAlign: 'right',
  },
  list: {
    marginLeft: '3ch',
  },
  title: {
    '&:active': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      textDecoration: 'underline',
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1rem',
    gap: theme.spacing(ICON_PADDING),
    marginBottom: '1rem',
    textAlign: 'start',
    width: '100%',
  },
  topLevelTitle: {
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const SideBarChapter: FC<SideBarChapterProps> = ({
  completedChapters,
  currentChapter,
  onChapterChange,
  subject,
  topLevel,
}) => {
  const [title] = useProperty(schema.title);
  const [icon] = useProperty(argu.icon);
  const [subChapters] = useProperty(argu.subChapters) as SomeNode[];
  const members = useResourceProperty(subChapters, rdfs.member);
  const classNames = useStyles();

  const titleClasses = clsx({
    [classNames.title]: true,
    [classNames.topLevelTitle]: topLevel,
    [classNames.activeTitle]: currentChapter === subject,
  });

  const completed = completedChapters.has(subject.value);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onChapterChange(subject);
  };

  return (
    <div>
      <a
        className={titleClasses}
        href={subject.value}
        onClick={handleClick}
      >
        {icon && (
          <FontAwesome
            className={classNames.icon}
            name={icon.value}
          />
        )}
        <span>
          {title.value}
        </span>
        {completed && (
          <FontAwesome
            className={`${classNames.icon} ${classNames.iconCompleted}`}
            name="check-circle"
          />
        )}
      </a>
      <ol className={classNames.list}>
        {members.map((member) => (
          <li key={member.value}>
            <Resource
              completedChapters={completedChapters}
              currentChapter={currentChapter}
              subject={member}
              onChapterChange={onChapterChange}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

SideBarChapter.type = [argu.Chapter];

SideBarChapter.topology = sideBarTopology;

export default register(SideBarChapter);
