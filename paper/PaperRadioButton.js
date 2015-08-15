// @author Taehoon Moon
require('../styles');

var Surface = require('famous-mig/core/Surface');
var Transform = require('famous-mig/core/Transform');
var Modifier = require('famous-mig/core/Modifier');
var OptionsManager = require('famous-mig/core/OptionsManager');
var StateModifier = require('famous-mig/modifiers/StateModifier');
var ContainerSurface = require('famous-mig/surfaces/ContainerSurface');
var SequentialLayout = require('famous-mig/views/SequentialLayout');
var Utility = require('famous-mig/utilities/Utility');
var Easing = require('famous-mig/transitions/Easing');

var PaperRipple = require('./PaperRipple');

function PaperRadioButton(options) {
    ContainerSurface.apply(this, arguments);

    this.options = {
        disabled: false,
        checked: false,
        toggles: false,
        color: '#009688',
        label: {
            size: [true, 36],
            properties: {
                textAlign: 'left',
                lineHeight: '36px',
                padding: '0 5px 0 0px'
            }
        }
    };

    if (options)
        OptionsManager.patch(this.options, options);

    this._outerRadioModifier = new Modifier({
        size: [16, 16],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this._outerRadio = new Surface({
        properties: {
            boxSizing: 'border-box',
            border: 'solid 2px #5a5a5a',
            borderRadius: '50%'
        }
    });

    if (this.options.checked)
        this._outerRadio.setProperties({
            border: 'solid 2px ' + this.options.color
        });

    this._innerRadioModifier = new StateModifier({
        size: [8, 8],
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: (this.options.checked ?
                    Transform.identity :
                    Transform.scale(0, 0))
    });

    this._innerRadio = new Surface({
        properties: {
            borderStyle: 'none',
            borderRadius: '50%',
            backgroundColor: this.options.color
        }
    });

    var rippleModifier = new Modifier({
        origin: [0, 0],
        align: [0, 0],
        transform: Transform.translate(0, 0, 5)
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

    if (this.options.label.content) {
        var layout = new SequentialLayout({
            direction: Utility.Direction.X
        });

        var radioContainer = new ContainerSurface({
            size: [47, undefined]
        });

        radioContainer.add(this._outerRadioModifier).add(this._outerRadio);
        radioContainer.add(this._innerRadioModifier).add(this._innerRadio);
        radioContainer.add(rippleModifier).add(this._ripple);

        if (this.options.size && (typeof this.options.size[0]) === 'number') {
            this.options.label.size = [
                this.options.size[0] - 47,
                this.options.label.size[1]
            ];
        }

        var labelContainer = new ContainerSurface({
            size: [this.options.label.size[0], undefined]
        });

        var labelModifier = new Modifier({
            size: this.options.label.size,
            origin: [0, 0.5],
            align: [0, 0.5]
        });
        this._labelSurface = new Surface(this.options.label);

        labelContainer.add(labelModifier).add(this._labelSurface);
        layout.sequenceFrom([radioContainer, labelContainer]);
        this.add(layout);
    }
    else {
        this.add(this._outerRadioModifier).add(this._outerRadio);
        this.add(this._innerRadioModifier).add(this._innerRadio);
        this.add(rippleModifier).add(this._ripple);
    }

    this.on('click', _onClick.bind(this));
}

PaperRadioButton.prototype = Object.create(ContainerSurface.prototype);
PaperRadioButton.prototype.constructor = PaperRadioButton;

function _onClick() {
    if (this.options.toggles)
        this.setChecked(!this.options.checked);
    else if (!this.getChecked())
        this.setChecked(true);

    this._eventOutput.emit('change', this.options.checked);
}

PaperRadioButton.prototype.getDisabled = function getDisabled() {
    return this.options.disabled;
};

PaperRadioButton.prototype.setDisabled = function setDisabled(disabled) {
    this.options.disabled = disabled;
    this._ripple.setDisabled(disabled);
};

PaperRadioButton.prototype.getChecked = function getChecked() {
    return this.options.checked;
};

PaperRadioButton.prototype.setChecked = function setChecked(checked) {
    this.options.checked = checked;
    if (this.getChecked()) {
        this._outerRadio.setProperties({
            border: 'solid 2px ' + this.options.color
        });
        this._innerRadioModifier.setTransform(
            Transform.identity,
            { duration: 280, curve: Easing.outQuad }
        );
    }
    else {
        this._outerRadio.setProperties({
            border: 'solid 2px #5a5a5a'
        });
        this._innerRadioModifier.setTransform(
            Transform.scale(0, 0),
            { duration: 280, curve: Easing.outQuad }
        );
    }
};

module.exports = PaperRadioButton;
