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
        if (options.icon) this._icon = options.icon;
        if (options.iconPosition) this._iconPosition = options.iconPosition;
        if (options.contentFlex) this._contentFlex = options.contentFlex;

        Surface.apply(this, arguments);
    }

    PaperButton.prototype = Object.create(Surface.prototype);
    PaperButton.prototype.constructor = PaperButton;

    PaperButton.prototype.elementType = 'famous-paper-button';
    PaperButton.prototype.elementClass = 'famous-surface';

    PaperButton.prototype.setContent = function setContent(content) {
        if (this._contentFlex)
            content = Util.format('<span flex>{0}</span>', content);

        if (this._icon) {
            var coreIcon = Util.format('<core-icon icon="{0}"></core-icon>', this._icon);
            this.content = this._iconPosition === Util.Position.RIGHT ?
                           content + coreIcon :
                           coreIcon + content;
        }
        else
            this.content = content;

        this._contentDirty = true;
        return this;
    };

    PaperButton.prototype.deploy = function deploy(target) {
        Surface.prototype.deploy.apply(this, arguments);
    };

    module.exports = PaperButton;
});
