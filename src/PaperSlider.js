// famous-polymer
// Taehoon Moon <panarch@kaist.ac.kr>
//
// PaperSlider
//
// Copyright Taehoon Moon 2014

define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');

    function PaperSlider(options) {
        Surface.apply(this, arguments);
    }

    PaperSlider.prototype = Object.create(Surface.prototype);
    PaperSlider.prototype.constructor = PaperSlider;

    PaperSlider.prototype.elementType = 'famous-paper-slider';
    PaperSlider.prototype.elementClass = 'famous-surface';

    PaperSlider.prototype.deploy = function deploy(target) {
        Surface.prototype.deploy.apply(this, arguments);
    };

    module.exports = PaperSlider;
});
