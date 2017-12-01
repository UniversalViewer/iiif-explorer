/*! Built with http://stenciljs.com */

iiifexplorer.loadStyles("iiif-explorer","iiif-explorer {\n  line-height: 1.2;\n}\n\niiif-explorer .explorer-link {\n  color: inherit;\n  text-decoration: none;\n}\n\niiif-explorer .explorer-link:hover {\n  text-decoration: underline;\n}\n\niiif-explorer .explorer-breadcrumb,\niiif-explorer .explorer-folder,\niiif-explorer .explorer-resource {\n  padding-left: 20px;\n  background-position: 1px center;\n  background-repeat: no-repeat;\n}\niiif-explorer.hydrated{visibility:inherit}","iiif-explorer-breadcrumb","iiif-explorer .explorer-breadcrumb {\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsDDi4GVw+uzgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAaElEQVQoz63TSQ7AIAxDUX/E/a/sLjqIQmkh1EsWL1YU0B6rHzQQTsRuLWAYYzf6hQrste0nNDAASUoKph4ehurk4G5u5SSRe8jM3gCnVeRxRxHkWAHpD+RqFEVsrx1k2aT5a7OHXT9sPGEpJgY7uFwAAAAASUVORK5CYII=\");\n  background-position: 0 center;\n}\niiif-explorer-breadcrumb.hydrated{visibility:inherit}","iiif-explorer-item","iiif-explorer .explorer-folder {\n  cursor: pointer;\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsDDi0N6/AkhQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAARUlEQVQoz+2TMQ4AIAwCwfj/L+PU6KDFpKPeTA4WCACShDMkCQdDsgsvfiujJGWhfOxssSJHFDUUiRFlUfBFT4v67Q0cAw/iHBfP65QbAAAAAElFTkSuQmCC\");\n}\n\niiif-explorer .explorer-resource {\n  cursor: pointer;\n  background-position: left top;\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsDEA8dR038uwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAARklEQVQoz+2TMQ4AIAgDe8b/f7kubqARV72RhGsZQBFrD6dD29EFyLaAdK+pyAwJSb0imW1SerHJUlg+bcUXPS3i4mnT3QFl8RAdYwbtnAAAAABJRU5ErkJggg==\");\n}\n\niiif-explorer .selected {\n  background-color: #000;\n  color: #fff;\n}\niiif-explorer-item.hydrated{visibility:inherit}");
iiifexplorer.loadComponents(

/**** module id (dev mode) ****/
"iiif-explorer",

/**** component modules ****/
function importComponent(exports, h, Context, publicPath) {
"use strict";
// @stencil/core

/// <reference types="manifesto.js" />
var IIIFExplorer = /** @class */ (function () {
    function IIIFExplorer() {
        this._parentCollections = [];
        //@Prop() breadcrumbsEnabled: boolean = true;
        this.upLevelEnabled = true;
        this.data = null;
    }
    IIIFExplorer.prototype.componentWillLoad = function () {
        this._reset();
    };
    IIIFExplorer.prototype._reset = function () {
        var _this = this;
        this._selectedManifest = null;
        this._selectedCollection = null;
        this._parentCollections = [];
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
                _this._selectedManifest = root;
            }
        }).catch(function (e) {
            console.error(e);
            console.error('failed to load manifest');
        });
    };
    IIIFExplorer.prototype._gotoBreadcrumb = function (node) {
        var index = this._parentCollections.indexOf(node);
        this._selectedCollection = this._parentCollections[index];
        this._parentCollections = this._parentCollections.slice(0, index + 1);
        this._selectedManifest = null;
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
            this._selectedCollection = collection;
            this._selectedManifest = null;
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
            parentCollections: this._parentCollections,
            selectedCollection: this._selectedCollection,
            selectedManifest: this._selectedManifest
        };
    };
    IIIFExplorer.prototype.reset = function () {
        this._reset();
        this._updateState();
    };
    IIIFExplorer.prototype.render = function () {
        var _this = this;
        if (!this.data || !this.data.selectedCollection) {
            return (h("span", null, "loading..."));
        }
        else {
            return (h("div", null,
                h("div", { class: "breadcrumbs" }, this.data.parentCollections.map(function (collection) {
                    return h("iiif-explorer-breadcrumb", { collection: collection });
                })),
                h("hr", null),
                h("div", { class: "items" }, this.data.selectedCollection.members.map(function (item) {
                    return h("iiif-explorer-item", { item: item, selected: _this._selectedManifest === item });
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
            this._selectedManifest = item;
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
        return (h("div", { class: "explorer-breadcrumb explorer-item" },
            h("a", { onClick: function () { return _this._breadcrumbSelectedHandler(); }, class: "explorer-breadcrumb-link explorer-link", href: "#", title: this.collection.getDefaultLabel() || 'no label' }, this.collection.getDefaultLabel() || 'no label')));
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
        return (h("div", { class: divClasses },
            h("a", { onClick: function () { return _this._itemSelectedHandler(); }, class: aClasses, title: this.item.getDefaultLabel() || 'no label' }, this.item.getDefaultLabel() || 'no label')));
    };
    IIIFExplorerItem.prototype._itemSelectedHandler = function () {
        this.onSelectItem.emit(this.item);
    };
    return IIIFExplorerItem;
}());

exports['iiif-explorer'] = IIIFExplorer;
exports['iiif-explorer-breadcrumb'] = IIIFExplorerBreadcrumb;
exports['iiif-explorer-item'] = IIIFExplorerItem;
},


/***************** iiif-explorer *****************/
[
/** iiif-explorer: tag **/
"iiif-explorer",

/** iiif-explorer: members **/
[
  [ "data", /** state **/ 5, /** do not observe attribute **/ 0, /** type any **/ 1 ],
  [ "manifest", /** prop **/ 1, /** observe attribute **/ 1, /** type string **/ 2 ],
  [ "reset", /** method **/ 6, /** do not observe attribute **/ 0, /** type any **/ 1 ],
  [ "upLevelEnabled", /** prop **/ 1, /** observe attribute **/ 1, /** type boolean **/ 3 ]
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
"iiif-explorer-breadcrumb",

/** iiif-explorer-breadcrumb: members **/
[
  [ "collection", /** prop **/ 1, /** do not observe attribute **/ 0, /** type any **/ 1 ]
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
"iiif-explorer-item",

/** iiif-explorer-item: members **/
[
  [ "item", /** prop **/ 1, /** do not observe attribute **/ 0, /** type any **/ 1 ],
  [ "selected", /** prop **/ 1, /** observe attribute **/ 1, /** type boolean **/ 3 ]
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
);