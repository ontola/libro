const moduleBrowserVersions = {
  chrome: '61',
  edge: '16',
  firefox: '60',
  ios: '10.3',
  opera: '48',
  safari: '10.1',
};

module.exports = {
  bundles: {
    legacy: 'legacy',
    module: 'module',
  },
  moduleBrowserVersions,
  moduleBrowsers: [
    `Chrome >= ${moduleBrowserVersions.chrome}`,
    `Safari >= ${moduleBrowserVersions.safari}`,
    `iOS >= ${moduleBrowserVersions.ios}`,
    `Firefox >= ${moduleBrowserVersions.firefox}`,
    `Edge >= ${moduleBrowserVersions.edge}`,
    `Opera >= ${moduleBrowserVersions.opera}`,
  ],
};
