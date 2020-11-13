import React from "react";
import { History } from "history";

/** Mapping for consistent component Ids, used by reactivesearch */
export const ids = {
  searchbox: "zoekterm",
  organisaties: "organisaties",
  daterange: "datums",
  type: "type",
  tag: "thema",
  location: "locatie",
};

export function usePersistedState<T>(key: string, initial: T):
  [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(() => {
    const storageValue = sessionStorage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue) || initial;
    }

    return initial;
  });

  const setPersistedValue = (next: T | React.SetStateAction<T>): void => {
    sessionStorage.setItem(key, JSON.stringify(next));
    setValue(next);
  };
  return [value, setPersistedValue];
}

export function myPersistedState<T>(key: string, initial: T): T {
  const storageValue = sessionStorage.getItem(key);
  if (storageValue === null) {
    return initial;
  }
  return JSON.parse(storageValue);
}

export const getTopicsApiURL = (relUrl: string): URL => {
  const url = new URL(window.location.origin);
  url.pathname = `/topics_api/dev${relUrl}`;

  return url
};

export const getParams = (history: History) => {
  const searchObject = history.location.search;
  const hasParams = searchObject !== "";
  const params = new URLSearchParams(searchObject);

  const currentResourceBase = params.get("showResource");
  let currentResource = null;
  if (currentResourceBase !== null) {
    currentResource = decodeURIComponent(currentResourceBase);
  }

  let currentSearchTerm = params.get(ids.searchbox);
  if (currentSearchTerm) {
    currentSearchTerm = currentSearchTerm.substr(1, currentSearchTerm.length - 2);
  }

  let documentID = null;
  if (currentResource !== null) {
    documentID = currentResource.split("/")[3]
  }

  return {
    currentResource,
    currentSearchTerm,
    hasParams,
    documentID
  };
};
