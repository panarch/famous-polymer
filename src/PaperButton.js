// famous-polymer
// Taehoon Moon <panarch@kaist.ac.kr>
//
// PaperButton
//
// Copyright Taehoon Moon 2014

define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');
    var Util = require('./Util');

    function PaperButton(options) {
        Surface.apply(this, arguments);

        this.init(options);
    }

    PaperButton.prototype = Object.create(Surface.prototype);
    PaperButton.prototype.constructor = PaperButton;

    PaperButton.prototype.elementType = 'paper-button';
    PaperButton.prototype.elementClass = 'famous-surface';

    PaperButton.prototype.init = function init(options) {
        var items = [];

        if (options.label) {
            var labelNode;
            if (typeof options.label === 'object') {
                labelNode = document.createElement('span');
                if (options.label.flex)
                    labelNode.setAttribute('flex', '');

                labelNode.appendChild(document.createTextNode(options.label.text));
            }
            else
                labelNode = document.createTextNode(options.label);

            items.push(labelNode);
        }

        var iconNode = document.createElement('core-icon');
        if (options.icon) {
            if (typeof options.icon === 'object') {
                iconNode.setAttribute('icon', options.icon.src);
                if (options.icon.position === Util.Position.RIGHT)
                    items.push(iconNode);
                else
                    items.splice(0, 0, iconNode);
            }
            else {
                iconNode.setAttribute('icon', options.icon);
                items.splice(0, 0, iconNode);
            }
        }

        var fragment = document.createDocumentFragment();
        for (var i = 0; i < items.length; i++)
            fragment.appendChild(items[i]);

        this.setContent(fragment);
    };

    PaperButton.prototype.deploy = function deploy(target) {
        Surface.prototype.deploy.apply(this, arguments);

        Polymer.addEventListener(this._currentTarget, 'tap', function() {});
        Polymer.addEventListener(this._currentTarget, 'hold', function() {});
        Polymer.addEventListener(this._currentTarget, 'holdpulse', function() {});
        Polymer.addEventListener(this._currentTarget, 'release', function() {});
    };

    module.exports = PaperButton;
});
