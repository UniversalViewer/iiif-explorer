# iiif-explorer-item



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type           | Default     |
| ------------- | -------------- | ----------- | -------------- | ----------- |
| `copyEnabled` | `copy-enabled` |             | `boolean`      | `true`      |
| `enabled`     | `enabled`      |             | `boolean`      | `true`      |
| `item`        | --             |             | `IIIFResource` | `undefined` |
| `selected`    | `selected`     |             | `boolean`      | `false`     |


## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `selectItem` |             | `CustomEvent<any>` |


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
  iiif-explorer-item --> ion-item
  iiif-explorer-item --> ion-icon
  iiif-explorer-item --> ion-label
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  iiif-explorer --> iiif-explorer-item
  style iiif-explorer-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
