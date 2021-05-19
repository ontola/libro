import { SomeTerm } from '@ontologies/core';
import { useLRS } from 'link-redux';
import React from 'react';

import useStoredState from '../useStoredState';

import { createFlattenFunction } from './flattenChapters';

type ChapterNavigationResult = {
  prevChapter: SomeTerm | undefined,
  nextChapter: SomeTerm | undefined,
  progress: number,
  completedChapters: Set<string>,
  currentChapter: SomeTerm,
  completeChapter: (chapter: SomeTerm) => void,
  navigate: (chapter: SomeTerm) => void,
};

export const useChapterNavigation = (subject: SomeTerm, subjectChapter?: SomeTerm): ChapterNavigationResult => {
  const createRangeMap = (x1: number, y1: number, x2: number, y2: number) => (value: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  const lrs = useLRS();
  const flattenChapters = createFlattenFunction(lrs);
  const chapters = React.useMemo(() => flattenChapters(subject), [subject]);
  const currentChapter = subjectChapter ?? chapters[0];
  const mapToRange = createRangeMap(0, chapters.length, 0, 100);

  const [prevChapter, setPrevChapter] = React.useState<SomeTerm>();
  const [nextChapter, setNextChapter] = React.useState<SomeTerm>();
  const [progress, setProgress] = React.useState(0);
  const [completedChapters, setCompletedChapters] = useStoredState<Set<string>>(
    `${subject.value}/completedChapters`,
    new Set<string>([]),
    localStorage,
    (x) => new Set(JSON.parse(x ?? '[]')),
    (x) => JSON.stringify(Array.from(x)),
  );

  React.useEffect(() => {
    const currentIndex = chapters.findIndex((x) => x.value === currentChapter?.value);

    setPrevChapter(chapters[currentIndex - 1]);
    setNextChapter(chapters[currentIndex + 1]);
  }, [currentChapter]);

  const completeChapter = (chapter: SomeTerm) => {
    const cloned = new Set(completedChapters);
    cloned.add(chapter.value);
    setCompletedChapters(cloned);
    setProgress(mapToRange(cloned.size));
  };

  const navigate = async (chapter: SomeTerm) => {
    await lrs.actions.ontola.navigate(chapter);
  };

  return {
    completeChapter,
    completedChapters: completedChapters ?? new Set([]),
    currentChapter,
    navigate,
    nextChapter,
    prevChapter,
    progress,
  };
};
