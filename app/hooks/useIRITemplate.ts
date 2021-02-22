import { NamedNode, Node } from '@ontologies/core';
import { useResourceProperty } from 'link-redux';
import { useCallback, useMemo } from 'react';

import { iriFromTemplate } from '../helpers/uriTemplate';
import ontola from '../ontology/ontola';

type Param = string | string[];
export interface Params { [key: string]: Param; }

export interface IRITemplate {
  add(key: string, value: string): NamedNode | null;
  remove(key: string, value: string): NamedNode | null;
  replace(key: string, value: string | string[]): NamedNode | null;
  set(params: Params): NamedNode | null;
}

export const useIRITemplate = (resource?: Node): IRITemplate => {
  const [iriTemplate] = useResourceProperty(resource, ontola.iriTemplate);
  const [iriTemplateOpts] = useResourceProperty(resource, ontola.iriTemplateOpts);
  const currentIriOpts = useMemo(() => {
    const opts: { [k: string]: string[] } = {};
    if (iriTemplateOpts) {
      const parsedIriOpts = new URLSearchParams(iriTemplateOpts.value);
      for (const key of parsedIriOpts.keys()) {
        opts[encodeURIComponent(key)] = parsedIriOpts.getAll(key);
      }
    }
    return opts;
  }, [iriTemplateOpts]);

  const set = useCallback((newOpts: Params) => {
    if (!iriTemplate) {
      return null;
    }

    const sanitizedOpts: Params = {};
    for (const key of Object.keys(newOpts)) {
      const value: Param = newOpts[key];

      sanitizedOpts[key] = Array.isArray(value)
        ? value.map(((item) => item.trim()))
        : value.trim();
    }

    return iriFromTemplate(iriTemplate.value, {
      ...currentIriOpts,
      ...sanitizedOpts,
    });
  }, [iriTemplate]);

  const replace = useCallback((key: string, value: string | string[]) => {
    return set({ [key]: value });
  }, [currentIriOpts, set]);

  const add = useCallback((key: string, value: string) => {
    const newValues = (currentIriOpts[key] || [])
      .concat(value)
      .sort();

    return set({ [key]: Array.from(new Set(newValues)) });
  }, [currentIriOpts, set]);

  const remove = useCallback((key: string, value: string) => {
    const newValues = (currentIriOpts[key] || [])
      .filter((val) => val !== value);

    return set({[key]: Array.from(new Set(newValues))});
  }, [currentIriOpts, set]);

  return {
    add,
    remove,
    replace,
    set,
  };
};
