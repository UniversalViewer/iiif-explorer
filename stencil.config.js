exports.config = {
  namespace: 'iiifexplorer',
  generateDistribution: true,
  generateWWW: false,
  bundles: [
    { components: ['iiif-explorer', 'iiif-explorer-item', 'iiif-explorer-breadcrumb'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
