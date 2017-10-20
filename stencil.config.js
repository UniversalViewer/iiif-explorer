exports.config = {
  namespace: 'iiifexplorer',
  generateDistribution: true,
  generateWWW: true,
  bundles: [
    { components: ['iiif-explorer', 'iiif-explorer-item', 'iiif-explorer-breadcrumb'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
