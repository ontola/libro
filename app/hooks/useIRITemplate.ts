import { Node } from '@ontologies/core';
import { useResourceProperty } from 'link-redux';
import { iriFromTemplate } from '../helpers/uriTemplate';
import ontola from '../ontology/ontola';

export const useIRITemplate = (collection: Node) => {
  const [iriTemplate] = useResourceProperty(collection, ontola.iriTemplate);
  const [iriTemplateOpts] = useResourceProperty(collection, ontola.iriTemplateOpts);
  const currentIriOpts: { [k: string]: string[] }  = {};
  if (iriTemplateOpts) {
    const parsedIriOpts = new URLSearchParams(iriTemplateOpts.value);
    for (const key of parsedIriOpts.keys()) {
      currentIriOpts[encodeURIComponent(key)] = parsedIriOpts.getAll(key);
    }
  }

  const iriAddParam = (key: string, value: string) => {
    const newValues = (currentIriOpts[key] || [])
      .concat(value)
      .sort();

    return iriSetParam(key, Array.from(new Set(newValues)));
  };

  const iriRemoveParam = (key: string, value: string) => {
    const newValues = (currentIriOpts[key] || [])
      .filter((val) => val !== value);

    return iriSetParam(key, Array.from(new Set(newValues)));
  };

  const iriSetParam = (key: string, value: string | string[] | null) => {
    if (!iriTemplate) {
      return null;
    }

    return iriFromTemplate(iriTemplate.value, {
      ...currentIriOpts,
      [key]: Array.isArray(value) ? value.map(((item) => item.trim())) : value?.trim(),
    });
  };

  return {
    iriAddParam,
    iriRemoveParam,
    iriSetParam,
  };
};
