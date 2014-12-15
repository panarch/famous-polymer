// famous-polymer
// Taehoon Moon <panarch@kaist.ac.kr>
//
// PaperDropdownMenu
//
// Copyright Taehoon Moon 2014

define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');

    function PaperDropdownMenu(options) {
        Surface.apply(this, arguments);

        if (options.items) this.setItems(options);
    }

    PaperDropdownMenu.prototype = Object.create(Surface.prototype);
    PaperDropdownMenu.prototype.constructor = PaperDropdownMenu;

    PaperDropdownMenu.prototype.elementType = 'famous-paper-dropdown-menu';
    PaperDropdownMenu.prototype.elementClass = 'famous-surface';

    PaperDropdownMenu.prototype.setItems = function setItems(options) {
        var items = options.items;

        var paperDropdown = document.createElement('paper-dropdown');
        var coreMenu = document.createElement('core-menu');
        paperDropdown.classList.add('dropdown');
        if (options.dropdownHeight)
            paperDropdown.style.height = options.dropdownHeight + 'px';

        coreMenu.classList.add('menu');

        for (var i = 0; i < items.length; i++) {
            var paperItem = document.createElement('paper-item');
            var item = items[i];
            if (item.value)
                paperItem.setAttribute('value', item.value);

            paperItem.appendChild(document.createTextNode(item.text));
            coreMenu.appendChild(paperItem);
        }
        paperDropdown.appendChild(coreMenu);

        this.setContent(paperDropdown);
        return this;
    };

    PaperDropdownMenu.prototype.deploy = function deploy(target) {
        Surface.prototype.deploy.apply(this, arguments);
    };

    module.exports = PaperDropdownMenu;
});
