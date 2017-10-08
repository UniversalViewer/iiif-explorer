exports.config = {
  namespace: 'iiifexplorer',
  generateDistribution: true,
  bundles: [
    { components: ['iiif-explorer', 'iiif-explorer-item'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
