# iiif-explorer



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type      | Default     |
| ------------------- | --------------------- | ----------- | --------- | ----------- |
| `copyEnabled`       | `copy-enabled`        |             | `boolean` | `false`     |
| `manifest`          | `manifest`            |             | `string`  | `undefined` |
| `pageLoadThreshold` | `page-load-threshold` |             | `string`  | `"10%"`     |
| `pageSize`          | `page-size`           |             | `number`  | `50`        |
| `pagingEnabled`     | `paging-enabled`      |             | `boolean` | `undefined` |
| `pagingLimitKey`    | `paging-limit-key`    |             | `string`  | `"_limit"`  |
| `pagingStartKey`    | `paging-start-key`    |             | `string`  | `"_start"`  |
| `searchEnabled`     | `search-enabled`      |             | `boolean` | `true`      |
| `upLevelEnabled`    | `up-level-enabled`    |             | `boolean` | `true`      |


## Events

| Event              | Description | Type               |
| ------------------ | ----------- | ------------------ |
| `selectCollection` |             | `CustomEvent<any>` |
| `selectManifest`   |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- ion-header
- ion-list
- ion-item
- ion-icon
- ion-spinner
- [iiif-explorer-breadcrumb](../iiif-explorer-breadcrumb)
- ion-content
- [iiif-explorer-item](../iiif-explorer-item)
- ion-infinite-scroll
- ion-infinite-scroll-content
- ion-footer
- ion-toolbar
- ion-searchbar

### Graph
```mermaid
graph TD;
  iiif-explorer --> ion-header
  iiif-explorer --> ion-list
  iiif-explorer --> ion-item
  iiif-explorer --> ion-icon
  iiif-explorer --> ion-spinner
  iiif-explorer --> iiif-explorer-breadcrumb
  iiif-explorer --> ion-content
  iiif-explorer --> iiif-explorer-item
  iiif-explorer --> ion-infinite-scroll
  iiif-explorer --> ion-infinite-scroll-content
  iiif-explorer --> ion-footer
  iiif-explorer --> ion-toolbar
  iiif-explorer --> ion-searchbar
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  iiif-explorer-breadcrumb --> ion-item
  iiif-explorer-breadcrumb --> ion-icon
  iiif-explorer-breadcrumb --> ion-label
  iiif-explorer-item --> ion-item
  iiif-explorer-item --> ion-icon
  iiif-explorer-item --> ion-label
  iiif-explorer-item --> ion-button
  ion-button --> ion-ripple-effect
  ion-infinite-scroll-content --> ion-spinner
  ion-searchbar --> ion-icon
  style iiif-explorer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
