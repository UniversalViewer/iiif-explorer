# iiif-explorer-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type         | Default     |
| ------------ | --------- | ----------- | ------------ | ----------- |
| `collection` | --        |             | `Collection` | `undefined` |
| `enabled`    | `enabled` |             | `boolean`    | `true`      |
| `isOpen`     | `is-open` |             | `boolean`    | `undefined` |


## Events

| Event              | Description | Type               |
| ------------------ | ----------- | ------------------ |
| `selectBreadcrumb` |             | `CustomEvent<any>` |
| `upLevel`          |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [iiif-explorer](../iiif-explorer)

### Depends on

- ion-item
- ion-icon
- ion-label

### Graph
```mermaid
graph TD;
  iiif-explorer-breadcrumb --> ion-item
  iiif-explorer-breadcrumb --> ion-icon
  iiif-explorer-breadcrumb --> ion-label
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  iiif-explorer --> iiif-explorer-breadcrumb
  style iiif-explorer-breadcrumb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
