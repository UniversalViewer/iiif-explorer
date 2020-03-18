import { Config } from '@stencil/core';
import resolve from 'rollup-plugin-node-resolve';

export const config: Config = {
  namespace: 'iiif-explorer',
  nodeResolve: {
    mainFields: ['module', 'main']
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
