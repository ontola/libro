import { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  dig,
  useFields,
  useIds,
  useLRS, 
} from 'link-redux';
import React from 'react';

import sales from '../ontology/sales';

export interface SalesArticleResult {
  articles: SomeTerm[];
  filter: SomeTerm | null;
  setFilter: (filter: SomeTerm | null) => void;
  themes: SomeTerm[];
  visible: boolean;
}

export const useSalesArticles = (subject: SomeNode, path: NamedNode[]): SalesArticleResult => {
  const lrs = useLRS();

  const items = useIds(subject, dig(...path));
  const themeList = useFields(items, sales.theme);

  const [themes, setThemes] = React.useState<SomeTerm[]>([]);
  const [articles, setArticles] = React.useState<SomeTerm[]>(items ?? []);
  const [filter, setFilter] = React.useState<SomeTerm | null>(null);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const uniqueThemes = Array.from(new Set(themeList.map((t: SomeTerm[]) => t[0])));
    setThemes(uniqueThemes);
  }, [themeList]);

  React.useEffect(() => {
    setVisible(false);

    setTimeout(() => {
      setVisible(true);
    }, 0);

    if (!filter) {
      setArticles(items ?? []);

      return;
    }

    const filteredItems = items
      .filter((item) => lrs.getResourceProperty(item, sales.theme)?.value === filter?.value);

    setArticles(filteredItems);
  }, [filter, items]);

  return {
    articles,
    filter,
    setFilter,
    themes,
    visible,
  };
};
