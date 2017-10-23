/*! Built with http://stenciljs.com */
iiifexplorer.loadComponents(

/**** module id (dev mode) ****/
"iiif-explorer",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
/// <reference path="../../../node_modules/manifesto.js/dist/manifesto.d.ts" />
var IIIFExplorer = /** @class */ (function () {
    function IIIFExplorer() {
        this._parentCollections = [];
        //@Prop() breadcrumbsEnabled: boolean = true;
        this.upLevelEnabled = true;
        this.data = null;
    }
    IIIFExplorer.prototype.componentWillLoad = function () {
        var _this = this;
        manifesto.loadManifest(this.manifest).then(function (data) {
            var root = manifesto.create(data);
            if (root.getProperty('within')) {
                // if the collection in within another, get the parents
                _this._followWithin(root).then(function (parents) {
                    _this._parentCollections = parents;
                    var start = parents.pop();
                    while (start && !start.isCollection()) {
                        start = parents.pop();
                    }
                    _this._switchToFolder(start);
                });
            }
            if (root.isCollection()) {
                _this._switchToFolder(root);
            }
            else {
                _this._currentManifest = root;
            }
        }).catch(function (e) {
            console.error(e);
            console.error('failed to load manifest');
        });
    };
    IIIFExplorer.prototype._gotoBreadcrumb = function (node) {
        var index = this._parentCollections.indexOf(node);
        this._currentCollection = this._parentCollections[index];
        this._parentCollections = this._parentCollections.slice(0, index + 1);
        this._currentManifest = null;
        this._updateState();
    };
    IIIFExplorer.prototype._sortCollectionsFirst = function (a, b) {
        var aType = a.getIIIFResourceType().value;
        var bType = b.getIIIFResourceType().value;
        if (aType === bType) {
            // Alphabetical
            var aLabel = Manifesto.TranslationCollection.getValue(a.getLabel());
            var bLabel = Manifesto.TranslationCollection.getValue(b.getLabel());
            if (aLabel && bLabel) {
                return aLabel < bLabel ? -1 : 1;
            }
        }
        // Collections first
        return bType.indexOf('collection') - aType.indexOf('collection');
    };
    IIIFExplorer.prototype._switchToFolder = function (collection) {
        if (!collection.isLoaded) {
            collection.load().then(this._switchToFolder.bind(this));
        }
        else {
            collection.members.sort(this._sortCollectionsFirst);
            this._parentCollections.push(collection);
            this._currentCollection = collection;
            this._currentManifest = null;
            this._updateState();
        }
    };
    IIIFExplorer.prototype._followWithin = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = node.getProperty('within');
            if (Array.isArray(url)) {
                resolve([]);
            }
            Manifesto.Utils.loadResource(url)
                .then(function (parent) {
                var parentManifest = manifesto.create(parent);
                if (parentManifest.getProperty('within')) {
                    _this._followWithin(parentManifest).then(function (array) {
                        array.push(node);
                        resolve(array);
                    });
                }
                else {
                    resolve([parentManifest, node]);
                }
            }).catch(reject);
        });
    };
    IIIFExplorer.prototype._updateState = function () {
        this.data = {
            parents: this._parentCollections,
            current: this._currentCollection,
            selected: this._currentManifest
        };
    };
    IIIFExplorer.prototype.render = function () {
        var _this = this;
        if (!this.data) {
            return (h("span", 0, t("loading...")));
        }
        else {
            return (h("div", 0,
                h("div", { "c": { "breadcrumbs": true } }, this.data.parents.map(function (collection) {
                    return h("iiif-explorer-breadcrumb", { "p": { "collection": collection } });
                })),
                h("hr", 0),
                h("div", { "c": { "items": true } }, this.data.current.members.map(function (item) {
                    return h("iiif-explorer-item", { "p": { "item": item, "selected": _this._currentManifest === item } });
                }))));
        }
    };
    IIIFExplorer.prototype.itemSelected = function (event) {
        var item = event.detail;
        if (item.isCollection()) {
            this._switchToFolder(item);
            this.onSelectCollection.emit(item);
        }
        else {
            this._currentManifest = item;
            this.onSelectManifest.emit(item);
        }
    };
    IIIFExplorer.prototype.breadcrumbSelected = function (event) {
        var item = event.detail;
        this._gotoBreadcrumb(item);
        this.onUpLevel.emit(item);
    };
    return IIIFExplorer;
}());

var IIIFExplorerBreadcrumb = /** @class */ (function () {
    function IIIFExplorerBreadcrumb() {
    }
    IIIFExplorerBreadcrumb.prototype.render = function () {
        var _this = this;
        return (h("div", { "c": { "explorer-breadcrumb": true, "explorer-item": true } },
            h("a", { "c": { "explorer-breadcrumb-link": true, "explorer-link": true }, "o": { "click": function () { return _this._breadcrumbSelectedHandler(); } }, "a": { "href": "#" }, "p": { "title": this.collection.getDefaultLabel() || 'no label' } }, this.collection.getDefaultLabel() || 'no label')));
    };
    IIIFExplorerBreadcrumb.prototype._breadcrumbSelectedHandler = function () {
        this.onSelectBreadcrumb.emit(this.collection);
    };
    return IIIFExplorerBreadcrumb;
}());

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ('object' !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
		// register as 'classnames', consistent with npm package name
		undefined('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

var IIIFExplorerItem = /** @class */ (function () {
    function IIIFExplorerItem() {
        this.selected = false;
    }
    IIIFExplorerItem.prototype.render = function () {
        var _this = this;
        var divClasses = classnames({
            'selected': this.selected,
            'explorer-folder': this.item.isCollection(),
            'explorer-resource': this.item.isManifest()
        });
        var aClasses = classnames({
            'explorer-folder-link': this.item.isCollection(),
            'explorer-item-link': this.item.isManifest(),
            'explorer-link': true
        });
        return (h("div", { "c": divClasses },
            h("a", { "c": aClasses, "o": { "click": function () { return _this._itemSelectedHandler(); } }, "p": { "title": this.item.getDefaultLabel() || 'no label' } }, this.item.getDefaultLabel() || 'no label')));
    };
    IIIFExplorerItem.prototype._itemSelectedHandler = function () {
        this.onSelectItem.emit(this.item);
    };
    return IIIFExplorerItem;
}());

exports['IIIF-EXPLORER'] = IIIFExplorer;
exports['IIIF-EXPLORER-BREADCRUMB'] = IIIFExplorerBreadcrumb;
exports['IIIF-EXPLORER-ITEM'] = IIIFExplorerItem;
},


/***************** iiif-explorer *****************/
[
/** iiif-explorer: tag **/
"IIIF-EXPLORER",

/** iiif-explorer: members **/
[
  [ "data", /** state **/ 5 ],
  [ "manifest", /** prop **/ 1 ],
  [ "upLevelEnabled", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** iiif-explorer: host **/
{},

/** iiif-explorer: events **/
[
  [
    /*****  iiif-explorer onSelectManifest ***** /
    /* event name ***/ "onSelectManifest"
  ],
  [
    /*****  iiif-explorer onSelectCollection ***** /
    /* event name ***/ "onSelectCollection"
  ],
  [
    /*****  iiif-explorer onUpLevel ***** /
    /* event name ***/ "onUpLevel"
  ]
]

],

/***************** iiif-explorer-breadcrumb *****************/
[
/** iiif-explorer-breadcrumb: tag **/
"IIIF-EXPLORER-BREADCRUMB",

/** iiif-explorer-breadcrumb: members **/
[
  [ "collection", /** prop **/ 1 ]
],

/** iiif-explorer-breadcrumb: host **/
{},

/** iiif-explorer-breadcrumb: events **/
[
  [
    /*****  iiif-explorer-breadcrumb onSelectBreadcrumb ***** /
    /* event name ***/ "onSelectBreadcrumb"
  ]
]

],

/***************** iiif-explorer-item *****************/
[
/** iiif-explorer-item: tag **/
"IIIF-EXPLORER-ITEM",

/** iiif-explorer-item: members **/
[
  [ "item", /** prop **/ 1 ],
  [ "selected", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** iiif-explorer-item: host **/
{},

/** iiif-explorer-item: events **/
[
  [
    /*****  iiif-explorer-item onSelectItem ***** /
    /* event name ***/ "onSelectItem"
  ]
]

]
)