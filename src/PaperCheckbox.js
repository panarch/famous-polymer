// famous-polymer
// Taehoon Moon <panarch@kaist.ac.kr>
//
// PaperCheckbox
//
// Copyright Taehoon Moon 2014

define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');

    function PaperCheckbox(options) {
        if (options && options.checked) this.setChecked(options.checked);

        Surface.apply(this, arguments);
    }

    PaperCheckbox.prototype = Object.create(Surface.prototype);
    PaperCheckbox.prototype.constructor = PaperCheckbox;

    PaperCheckbox.prototype.elementType = 'paper-checkbox';
    PaperCheckbox.prototype.elementClass = 'famous-surface';

    PaperCheckbox.prototype.setChecked = function setChecked(checked) {
        this._checked = checked;
        this.setAttributes({ checked: this._checked });
    };

    PaperCheckbox.prototype.getChecked = function getChecked() {
        return this._checked;
    };

    PaperCheckbox.prototype.deploy = function deploy(target) {
        Surface.prototype.deploy.apply(this, arguments);

        Polymer.addEventListener(this._currentTarget, 'tap', function() {});
    };

    module.exports = PaperCheckbox;
});
