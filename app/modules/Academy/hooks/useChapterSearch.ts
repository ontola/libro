import { Node, SomeTerm } from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { useLRS } from 'link-redux';
import React from 'react';

import argu from '../../Argu/ontology/argu';
import elements from '../../Elements/ontology/elements';
import { createFlattenFunction } from '../lib/flattenChapters';

export type SearchObject = {
  key: string,
  text: string,
};

const cleanText = (text: string) => text.replace(/\s{2,}/g, ' ').trim();

const addMissingSentenceBoundaries = (text: string, subjectType: SomeTerm) => {
  switch (subjectType.value) {
  case elements.H1.value:
  case elements.H2.value:
  case elements.H3.value:
  case elements.H4.value:
  case elements.H5.value:
  case elements.H6.value:
  case elements.Li.value:
    return /(\.|\?|:|”)\s*$/gm.test(text) ? text : `${text}.`;
  default:
    return text;
  }
};

export const useChapterSearch = (subject: SomeTerm): SearchObject[] => {
  const lrs = useLRS();
  const [searchArray, setSearchArray] = React.useState<SearchObject[]>([]);

  const flattenChapters = createFlattenFunction(lrs);

  const flattenChapterContent = (leaf: SomeTerm): string => {
    const [text] = lrs.dig(leaf as Node, [schema.text]);
    const children = lrs.dig(leaf as Node, [elements.children, rdfs.member]);
    const leafType = lrs.getResourceProperty(leaf as Node, rdf.type);

    if (children.length > 0) {
      const composedText = children.reduce((acc, child) => `${acc} ${flattenChapterContent(child)}`, text?.value ?? '');

      return addMissingSentenceBoundaries(composedText, leafType!);
    }

    return text?.value ?? '';
  };

  const createChapterSearchObject = (chapter: SomeTerm): SearchObject | null => {
    const content = lrs.getResourceProperty(chapter as Node, argu.chapterContent);

    if (content) {
      const flattenedContent = flattenChapterContent(content);

      return {
        key: chapter.value,
        text: cleanText(flattenedContent),
      };
    }

    return null;
  };

  const chapters = React.useMemo(() => flattenChapters(subject), [subject]);

  React.useEffect(() => {
    setSearchArray(chapters.map(createChapterSearchObject).filter((x) => x !== null) as SearchObject[]);
  }, [subject, chapters]);

  return searchArray;
};
