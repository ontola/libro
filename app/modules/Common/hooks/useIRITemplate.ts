import { NamedNode, Node } from '@ontologies/core';
import { useFields } from 'link-redux';
import { useCallback, useMemo } from 'react';

import ontola from '../../Kernel/ontology/ontola';
import { iriFromTemplate } from '../lib/uriTemplate';

type Param = string | string[];

export type Params = Record<string, Param>;

export interface IRITemplate {
  add(key: string, value: string): NamedNode | null;
  remove(key: string, value: string): NamedNode | null;
  replace(key: string, value: string | string[]): NamedNode | null;
  set(params: Params): NamedNode | null;
}

export const useIRITemplate = (resource?: Node): IRITemplate => {
  const [iriTemplate] = useFields(resource, ontola.iriTemplate);
  const [iriTemplateOpts] = useFields(resource, ontola.iriTemplateOpts);

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
    } as any);
  }, [iriTemplate, currentIriOpts]);

  const replace = useCallback(
    (key: string, value: string | string[]) => set({ [key]: value }),
    [currentIriOpts, set],
  );

  const add = useCallback((key: string, value: string) => {
    const newValues = (currentIriOpts[key] || [])
      .concat(value)
      .sort();

    return set({ [key]: Array.from(new Set(newValues)) });
  }, [currentIriOpts, set]);

  const remove = useCallback((key: string, value: string) => {
    const newValues = (currentIriOpts[key] || [])
      .filter((val) => val !== value);

    return set({ [key]: Array.from(new Set(newValues)) });
  }, [currentIriOpts, set]);

  return {
    add,
    remove,
    replace,
    set,
  };
};
