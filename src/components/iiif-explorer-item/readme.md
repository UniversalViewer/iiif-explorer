# iiif-explorer-item



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type           | Default     |
| -------------------- | ---------------------- | ----------- | -------------- | ----------- |
| `copyEnabled`        | `copy-enabled`         |             | `boolean`      | `true`      |
| `enabled`            | `enabled`              |             | `boolean`      | `true`      |
| `item`               | --                     |             | `IIIFResource` | `undefined` |
| `popoverFadeTimeout` | `popover-fade-timeout` |             | `number`       | `1000`      |
| `selected`           | `selected`             |             | `boolean`      | `false`     |


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
- ion-button

### Graph
```mermaid
graph TD;
  iiif-explorer-item --> ion-item
  iiif-explorer-item --> ion-icon
  iiif-explorer-item --> ion-label
  iiif-explorer-item --> ion-button
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  iiif-explorer --> iiif-explorer-item
  style iiif-explorer-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
