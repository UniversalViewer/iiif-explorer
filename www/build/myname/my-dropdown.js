/*! Built with http://stenciljs.com */
myname.loadComponents(

/**** module id (dev mode) ****/
"my-dropdown",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var Dropdown = /** @class */ (function () {
    function Dropdown() {
        this.title = '';
        this.toggle = false;
    }
    Dropdown.prototype.render = function () {
        var _this = this;
        return (h("div", 0,
            h("button", { "o": { "click": function () { return _this.toggleClick(); } } },
                this.title, t(" "),
                this.toggle ? h("span", 0, t("\u25B2")) : h("span", 0, t("\u25BC"))),
            h("div", { "s": { "display": this.toggle ? 'block' : 'none' } },
                h(0, 0))));
    };
    Dropdown.prototype.toggleClick = function () {
        this.toggle = !this.toggle;
        // When the user click emit the toggle state value
        // A event can emit any type of value
        console.log("test");
        this.onToggle.emit({ visible: this.toggle });
    };
    return Dropdown;
}());

exports['MY-DROPDOWN'] = Dropdown;
},


/***************** my-dropdown *****************/
[
/** my-dropdown: tag **/
"MY-DROPDOWN",

/** my-dropdown: members **/
[
  [ "title", /** prop **/ 1 ],
  [ "toggle", /** state **/ 5 ]
],

/** my-dropdown: host **/
{},

/** my-dropdown: events **/
[
  [
    /*****  my-dropdown onToggle ***** /
    /* event name ***/ "onToggle"
  ]
]

]
)