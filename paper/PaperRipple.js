// @author Taehoon Moon
require('../styles');

var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var StateModifier = require('famous/modifiers/StateModifier');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Easing = require('famous/transitions/Easing');

function PaperRipple(options) {
    ContainerSurface.apply(this, arguments);
    this._waitings = [];

    if (options.ripple)
        this._ripple = options.ripple;

    this.setProperties({
        overflow: 'hidden',
        cursor: 'pointer'
    });

    var eventModifier = new Modifier({
        transform: Transform.translate(0, 0, 0.01)
    });

    var eventSurface = new Surface({
        properties: {
            zIndex: 1
        }
    });

    this.add(eventModifier).add(eventSurface);

    eventSurface.on('click', _onClick.bind(this));
}

PaperRipple.prototype = Object.create(ContainerSurface.prototype);
PaperRipple.prototype.constructor = PaperRipple;

PaperRipple.SIZE = [360, 360];
PaperRipple.DURATION = 500;

function _pop() {
    if (this._waitings.length > 0)
        return this._waitings.splice(0, 1)[0];

    var size = this._ripple && this._ripple.size ?
            this._ripple.size :
            PaperRipple.SIZE;

    // create new one
    var modifier = new StateModifier({
        size: size,
        origin: [0.5, 0.5],
        align: [0, 0],
        transform: Transform.scale(0, 0),
        opacity: 1
    });

    var ripple = new Surface({
        classes: ['paper-ripple']
    });

    if (this._ripple && this._ripple.properties)
        ripple.setProperties(this._ripple.properties);

    this.add(modifier).add(ripple);
    return modifier;
}

function _onClick(e) {
    var modifier = _pop.call(this);
    var x = (e.offsetX || e.layerX);
    var y = (e.offsetY || e.layerY);
    var d = this._ripple && this._ripple.duration ?
            this._ripple.duration :
            PaperRipple.DURATION;

    modifier.setTransform(
        Transform.thenMove(Transform.scale(0, 0), [x, y, 0]),
        { duration: 1 },
        callback.bind(this)
    );

    function callback() {
        modifier.setTransform(
            Transform.thenMove(Transform.scale(1, 1), [x, y, 0]),
            { duration: d, curve: Easing.outQuad }
        );
        modifier.setOpacity(
             0,
             { duration: d, curve: Easing.outQuad },
             callback2.bind(this)
        );
    }

    function callback2() {
        modifier.setOpacity(1, { duration: 1 });
        modifier.setTransform(Transform.scale(0, 0), { duration: 1 });
        this._waitings.push(modifier);
    }
}

module.exports = PaperRipple;
