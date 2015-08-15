// @author Taehoon Moon
require('../styles');

var Surface = require('famous-mig/core/Surface');
var Transform = require('famous-mig/core/Transform');
var Modifier = require('famous-mig/core/Modifier');
var OptionsManager = require('famous-mig/core/OptionsManager');
var StateModifier = require('famous-mig/modifiers/StateModifier');
var ContainerSurface = require('famous-mig/surfaces/ContainerSurface');
var Easing = require('famous-mig/transitions/Easing');

function PaperRipple(options) {
    ContainerSurface.apply(this, arguments);
    this._waitings = [];

    this.options = {
        disabled: false,
        recenteringTouch: false,
        ripple: {
            size: [360, 360],
            duration: 500,
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }
        },
        properties: {
            overflow: 'hidden',
            cursor: 'pointer'
        }
    };

    if (options)
        OptionsManager.patch(this.options, options);

    this.setProperties(this.options.properties);
    this._ripple = this.options.ripple;

    var eventModifier = new Modifier({
        transform: Transform.translate(0, 0, 10)
    });

    var eventSurface = new Surface({
        properties: {
            zIndex: 5
        }
    });

    this.add(eventModifier).add(eventSurface);

    eventSurface.on('click', _onClick.bind(this));
}

PaperRipple.prototype = Object.create(ContainerSurface.prototype);
PaperRipple.prototype.constructor = PaperRipple;

function _pop() {
    if (this._waitings.length > 0)
        return this._waitings.splice(0, 1)[0];

    // create new one
    var modifier = new StateModifier({
        size: this._ripple.size,
        origin: [0.5, 0.5],
        align: [0, 0],
        transform: Transform.scale(0, 0),
        opacity: 1
    });

    var ripple = new Surface({
        classes: ['paper-ripple']
    });

    ripple.setProperties(this._ripple.properties);

    this.add(modifier).add(ripple);
    return {
        modifier: modifier,
        ripple: ripple
    };
}

function _onClick(e) {
    if (this.options.disabled) {
        e.stopPropagation();
        return false;
    }

    var item = _pop.call(this);
    var modifier = item.modifier;

    var beginX = (e.offsetX || e.layerX);
    var beginY = (e.offsetY || e.layerY);
    var endX;
    var endY;
    if (this.options.recenteringTouch) {
        var size = this.getSize();
        endX = size[0] / 2;
        endY = size[1] / 2;
    }
    else {
        endX = beginX;
        endY = beginY;
    }
    var d = this._ripple.duration;

    modifier.setOpacity(1);
    modifier.setTransform(
        Transform.thenMove(Transform.scale(0, 0), [beginX, beginY, 0]),
        { duration: 1 },
        callback.bind(this)
    );

    function callback() {
        modifier.setTransform(
            Transform.thenMove(Transform.scale(1, 1), [endX, endY, 0]),
            { duration: d, curve: Easing.outQuad }
        );
        modifier.setOpacity(
             0,
             { duration: d, curve: Easing.outQuad },
             callback2.bind(this)
        );
    }

    function callback2() {
        modifier.setTransform(Transform.scale(0, 0));
        this._waitings.push(item);
    }
}

PaperRipple.prototype.setDisabled = function setDisabled(disabled) {
    this.options.disabled = disabled;
};

module.exports = PaperRipple;
