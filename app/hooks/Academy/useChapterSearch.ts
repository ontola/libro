import { Node, SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { useLRS } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import elements from '../../ontology/elements';

import { createFlattenFunction } from './flattenChapters';

export type SearchObject = {
  key: string,
  text: string,
};

export const useChapterSearch = (subject: SomeTerm): SearchObject[] => {
  const lrs = useLRS();
  const [searchArray, setSearchArray] = React.useState<SearchObject[]>([]);

  const flattenChapters = createFlattenFunction(lrs);

  const flattenChapterContent = (leaf: SomeTerm): string => {
    const [text] = lrs.dig(leaf as Node, [schema.text]);
    const children = lrs.dig(leaf as Node, [elements.children, rdfs.member]);

    if (children.length > 0) {
      return children.reduce((acc, child) => `${acc} ${flattenChapterContent(child)}`, text?.value ?? '');
    }

    return text?.value ?? '';
  };

  const createChapterSearchObject = (chapter: SomeTerm): SearchObject | null => {
    const [content] = lrs.dig(chapter as Node, [argu.chapterContent, rdfs.member]);

    if (content) {
      return {
        key: chapter.value,
        text: flattenChapterContent(content),
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
