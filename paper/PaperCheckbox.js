// @author Taehoon Moon
require('../styles');

var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var OptionsManager = require('famous/core/OptionsManager');
var StateModifier = require('famous/modifiers/StateModifier');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Easing = require('famous/transitions/Easing');

var PaperRipple = require('./PaperRipple');

var CHECKBOX_ACTIVE = Transform.thenMove(Transform.rotateZ(Math.PI / 4), [0, -2, 0]);
var CHECKBOX_INACTIVE = Transform.thenScale(Transform.thenMove(Transform.rotateZ(Math.PI / 4), [0, -2, 0]), [0, 0, 1]);

function PaperCheckbox(options) {
    ContainerSurface.apply(this, arguments);

    this.options = {
        disabled: false,
        checked: false,
        color: '#009688'
    };

    if (options)
        OptionsManager.patch(this.options, options);

    this._checkboxShapeModifier = new Modifier({
        size: [18, 18],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this._checkboxShape = new Surface({
        properties: {
            boxSizing: 'border-box',
            border: 'solid 2px #5a5a5a',
            borderRadius: '2px'
        }
    });

    if (this.options.checked)
        this._checkboxShape.setProperties({
            border: 'solid 2px ' + this.options.color,
            backgroundColor: this.options.color
        });

    this._checkmarkModifier = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        size: [7, 12],
        transform: (this.options.checked ?
                    CHECKBOX_ACTIVE :
                    CHECKBOX_INACTIVE)
    });
    this._checkmark = new Surface({
        properties: {
            borderStyle: 'solid',
            borderTop: 'none',
            borderLeft: 'none',
            borderRightWidth: '2px',
            borderBottomWidth: '2px',
            borderColor: 'white'
        }
    });

    var rippleModifier = new Modifier({
        origin: [0, 0],
        align: [0, 0],
        transform: Transform.translate(0, 0, 0.01)
    });

    this._ripple = new PaperRipple({
        recenteringTouch: true,
        ripple: {
            size: [46, 46],
            duration: 300,
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    });

    if (this.options.disabled)
        this.setDisabled(true);

    this.add(this._checkboxShapeModifier).add(this._checkboxShape);
    this.add(this._checkmarkModifier).add(this._checkmark);
    this.add(rippleModifier).add(this._ripple);

    this.on('click', _onClick.bind(this));
}

PaperCheckbox.prototype = Object.create(ContainerSurface.prototype);
PaperCheckbox.prototype.constructor = PaperCheckbox;

function _onClick() {
    this.setChecked(!this.options.checked);
    this._eventOutput.emit('change', this.options.checked);
}

PaperCheckbox.prototype.getDisabled = function getDisabled() {
    return this.options.disabled;
};

PaperCheckbox.prototype.setDisabled = function setDisabled(disabled) {
    this.options.disabled = disabled;
    this._ripple.setDisabled(disabled);
};

PaperCheckbox.prototype.getChecked = function getChecked() {
    return this.options.checked;
};

PaperCheckbox.prototype.setChecked = function setChecked(checked) {
    this.options.checked = checked;
    if (this.getChecked()) {
        this._checkboxShape.setProperties({
            border: 'solid 2px ' + this.options.color,
            backgroundColor: this.options.color
        });
        this._checkmarkModifier.setTransform(
            CHECKBOX_ACTIVE,
            { duration: 180, curve: Easing.outQuad }
        );
    }
    else {
        this._checkboxShape.setProperties({
            border: 'solid 2px #5a5a5a',
            backgroundColor: 'transparent'
        });
        this._checkmarkModifier.setTransform(
            CHECKBOX_INACTIVE,
            { duration: 180, curve: Easing.outQuad }
        );
    }
};

module.exports = PaperCheckbox;
