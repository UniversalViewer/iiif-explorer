/*! Built with http://stenciljs.com */
iiifexplorer.loadComponents("fmptirta",function(e,t,i,o,n){var l=function(){function e(){this._parentCollections=[],this.upLevelEnabled=!0,this.data=null}return e.prototype.componentWillLoad=function(){this._reset()},e.prototype._reset=function(){var e=this;this._selectedManifest=null,this._selectedCollection=null,this._parentCollections=[],manifesto.loadManifest(this.manifest).then(function(t){var i=manifesto.create(t);i.getProperty("within")&&e._followWithin(i).then(function(t){e._parentCollections=t;for(var i=t.pop();i&&!i.isCollection();)i=t.pop();e._switchToFolder(i)}),i.isCollection()?e._switchToFolder(i):e._selectedManifest=i}).catch(function(e){console.error(e),console.error("failed to load manifest")})},e.prototype._gotoBreadcrumb=function(e){var t=this._parentCollections.indexOf(e);this._selectedCollection=this._parentCollections[t],this._parentCollections=this._parentCollections.slice(0,t+1),this._selectedManifest=null,this._updateState()},e.prototype._sortCollectionsFirst=function(e,t){var i=e.getIIIFResourceType().value,o=t.getIIIFResourceType().value;if(i===o){var n=Manifesto.TranslationCollection.getValue(e.getLabel()),l=Manifesto.TranslationCollection.getValue(t.getLabel());if(n&&l)return n<l?-1:1}return o.indexOf("collection")-i.indexOf("collection")},e.prototype._switchToFolder=function(e){e.isLoaded?(e.members.sort(this._sortCollectionsFirst),this._parentCollections.push(e),this._selectedCollection=e,this._selectedManifest=null,this._updateState()):e.load().then(this._switchToFolder.bind(this))},e.prototype._followWithin=function(e){var t=this;return new Promise(function(i,o){var n=e.getProperty("within");Array.isArray(n)&&i([]),Manifesto.Utils.loadResource(n).then(function(o){var n=manifesto.create(o);n.getProperty("within")?t._followWithin(n).then(function(t){t.push(e),i(t)}):i([n,e])}).catch(o)})},e.prototype._updateState=function(){this.data={parentCollections:this._parentCollections,selectedCollection:this._selectedCollection,selectedManifest:this._selectedManifest}},e.prototype.reset=function(){this._reset(),this._updateState()},e.prototype.render=function(){var e=this;return this.data&&this.data.selectedCollection?t("div",0,t("div",{c:{breadcrumbs:!0}},this.data.parentCollections.map(function(e){return t("iiif-explorer-breadcrumb",{p:{collection:e}})})),t("hr",0),t("div",{c:{items:!0}},this.data.selectedCollection.members.map(function(i){return t("iiif-explorer-item",{p:{item:i,selected:e._selectedManifest===i}})}))):t("span",0,i("loading..."))},e.prototype.itemSelected=function(e){var t=e.detail;t.isCollection()?(this._switchToFolder(t),this.onSelectCollection.emit(t)):(this._selectedManifest=t,this.onSelectManifest.emit(t))},e.prototype.breadcrumbSelected=function(e){var t=e.detail;this._gotoBreadcrumb(t),this.onUpLevel.emit(t)},e}(),r=function(){function e(){}return e.prototype.render=function(){var e=this;return t("div",{c:{"explorer-breadcrumb":!0,"explorer-item":!0}},t("a",{c:{"explorer-breadcrumb-link":!0,"explorer-link":!0},o:{click:function(){return e._breadcrumbSelectedHandler()}},a:{href:"#"},p:{title:this.collection.getDefaultLabel()||"no label"}},this.collection.getDefaultLabel()||"no label"))},e.prototype._breadcrumbSelectedHandler=function(){this.onSelectBreadcrumb.emit(this.collection)},e}(),s=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e){!function(){"use strict";function t(){for(var e=[],o=0;o<arguments.length;o++){var n=arguments[o];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n))e.push(t.apply(null,n));else if("object"===l)for(var r in n)i.call(n,r)&&n[r]&&e.push(r)}}return e.join(" ")}var i={}.hasOwnProperty;e.exports?e.exports=t:window.classNames=t}()}),c=function(){function e(){this.selected=!1}return e.prototype.render=function(){var e=this,i=s({selected:this.selected,"explorer-folder":this.item.isCollection(),"explorer-resource":this.item.isManifest()}),o=s({"explorer-folder-link":this.item.isCollection(),"explorer-item-link":this.item.isManifest(),"explorer-link":!0});return t("div",{c:i},t("a",{c:o,o:{click:function(){return e._itemSelectedHandler()}},p:{title:this.item.getDefaultLabel()||"no label"}},this.item.getDefaultLabel()||"no label"))},e.prototype._itemSelectedHandler=function(){this.onSelectItem.emit(this.item)},e}();e["IIIF-EXPLORER"]=l,e["IIIF-EXPLORER-BREADCRUMB"]=r,e["IIIF-EXPLORER-ITEM"]=c},["IIIF-EXPLORER",[["data",5],["manifest",1],["reset",6],["upLevelEnabled",1,1]],{},[["onSelectManifest"],["onSelectCollection"],["onUpLevel"]]],["IIIF-EXPLORER-BREADCRUMB",[["collection",1]],{},[["onSelectBreadcrumb"]]],["IIIF-EXPLORER-ITEM",[["item",1],["selected",1,1]],{},[["onSelectItem"]]]);