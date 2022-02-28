export interface DistributionMeta {
  version: string;
  message: string;
  createdAt: number;
  live: boolean;
}

export interface DistributionMetaWithIRI extends DistributionMeta {
  iri: string;
}

export interface Publication {
  startRoute: string;
  projectId: string;
  distributionId: string;
}

const postDistribution = async (projectId: string, meta: DistributionMeta): Promise<boolean> => {
  const url = `${projectId}/distributions`;
  const response = await fetch(url, {
    body: JSON.stringify(meta),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return response.ok;
};

export const createNewDistribution = async (projectId: string, version: string, message: string): Promise<boolean> =>
  postDistribution(projectId, {
    createdAt: Date.now(),
    live: false,
    message,
    version,
  });

export const buildDistributionIri = (projectIri: string, distributionId: string): string =>
  `${projectIri}/distributions/${distributionId}`;

export const deployDistribution = async (distributionIri: string, route: URL): Promise<boolean> => {
  const response = await fetch(`${distributionIri}/publication`, {
    body: route.toString(),
    method: 'POST',
  });

  return response.ok;
};

export const unMountDistribution = async (distributionIri: string, route: URL): Promise<boolean> => {
  const response = await fetch(`${distributionIri}/publication/unmount`, {
    body: route.toString(),
    method: 'POST',
  });

  return response.ok;
};
