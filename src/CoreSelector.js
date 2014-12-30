// famous-polymer
// Taehoon Moon <panarch@kaist.ac.kr>
//
// CoreSelector
//
// Copyright Taehoon Moon 2014

define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');

    function CoreSelector(options) {
        Surface.apply(this, arguments);

        if (options.items) this.setItems(options.items);
    }

    CoreSelector.prototype = Object.create(Surface.prototype);
    CoreSelector.prototype.constructor = CoreSelector;

    CoreSelector.prototype.elementType = 'core-selector';
    CoreSelector.prototype.elementClass = 'famous-surface';

    CoreSelector.prototype.setItems = function setItems(items) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < items.length; i++) {
            var paperItem = document.createElement('paper-item');
            var item = items[i];

            if (item.value)
                paperItem.setAttribute('value', item.value);

            paperItem.appendChild(document.createTextNode(item.text));
            fragment.appendChild(paperItem);
        }

        this.setContent(fragment);
    };

    CoreSelector.prototype.deploy = function deploy(target) {
        Surface.prototype.deploy.apply(this, arguments);

        Polymer.addEventListener(this._currentTarget, 'tap', function() {});
    };

    module.exports = CoreSelector;
});
