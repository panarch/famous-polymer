// @author Taehoon Moon
require('../styles');

var Surface = require('famous-mig/core/Surface');
var Transform = require('famous-mig/core/Transform');
var Modifier = require('famous-mig/core/Modifier');
var OptionsManager = require('famous-mig/core/OptionsManager');
var ImageSurface = require('famous-mig/surfaces/ImageSurface');
var ContainerSurface = require('famous-mig/surfaces/ContainerSurface');
var SequentialLayout = require('famous-mig/views/SequentialLayout');
var Utility = require('famous-mig/utilities/Utility');

var PaperRipple = require('./PaperRipple');

function PaperButton(options) {
    ContainerSurface.apply(this, arguments);

    this.options = {
        flat: false,
        disabled: false,
        selected: false,
        label: {
            size: [undefined, 36],
            properties: {
                textAlign: 'left',
                lineHeight: '38px',
                fontSize: '18px',
                padding: '0 5px 0 5px'
            }
        },
        icon: {
            size: [36, 36]
        },
        ripple: {
        },
        properties: {
            backgroundColor: 'transparent',
            color: 'black'
        },
        disabledProperties: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: '#8d8d8d'
        },
        selectedProperties: {
            backgroundColor: '#639dee',// rgba(30, 30, 190, 0.2)',
            color: 'white'
        }
    };

    if (options)
        OptionsManager.patch(this.options, options);

    if (!this.options.flat)
        this.addClass('paper-shadow').addClass('paper-border');

    var h;
    if (this.options.label.content)
        h = this.options.label.size[1];

    if (this.options.icon.content) {
        if (this.options.icon.size[1] > h) h = this.options.icon.size[1];
    }
    else {
        this.options.label.size[0] = undefined;
        this.options.label.properties.textAlign = 'center';
    }

    var rippleModifier = new Modifier({
        transform: Transform.translate(0, 0, 11)
    });

    this._ripple = new PaperRipple({ ripple: this.options.ripple });

    if (this.options.disabled)
        this.setDisabled(true);

    if (this.options.selected)
        this.setSelected(true);

    var layoutModifier = new Modifier({
        size: [undefined, h],
        origin: [0, 0.5],
        align: [0, 0.5]
    });

    var layoutTransform = this.options.icon.content ?
                        Transform.translate(5, 0, 10) :
                        Transform.translate(0, 0, 10);

    layoutModifier.transformFrom(layoutTransform);

    var layout = new SequentialLayout({
        direction: Utility.Direction.X
    });

    var items = [];

    if (this.options.icon.content) {
        this._imageSurface = new ImageSurface(this.options.icon);
        items.push(this._imageSurface);
    }

    if (this.options.label.content) {
        this._labelSurface = new Surface(this.options.label);
        items.push(this._labelSurface);
    }

    layout.sequenceFrom(items);

    this.add(layoutModifier).add(layout);
    this.add(rippleModifier).add(this._ripple);
}

PaperButton.prototype = Object.create(ContainerSurface.prototype);
PaperButton.prototype.constructor = PaperRipple;

PaperButton.prototype.setDisabled = function setDisabled(disabled) {
    this.options.disabled = disabled;
    this._ripple.setDisabled(disabled);
    if (disabled) {
        this.setProperties(this.options.disabledProperties);
        this.removeClass('paper-shadow');
    }
    else {
        this.setProperties(this.options.properties);
        if (!this.options.flat)
            this.addClass('paper-shadow');
    }
};

PaperButton.prototype.getSelected = function getSelected() {
    return this.options.selected;
};

PaperButton.prototype.setSelected = function setSelected(selected) {
    this.options.selected = selected;
    if (selected)
        this.setProperties(this.options.selectedProperties);
    else
        this.setProperties(this.options.properties);
};

PaperButton.prototype.getLabelContent = function getLabelContent() {
    if (!this._labelSurface)
        return undefined;

    return this.options.label.content;
};

PaperButton.prototype.setLabelContent = function setLabelContent(content) {
    if (!this._labelSurface)
        return;

    this.options.label.content = content;
    this._labelSurface.setContent(content);
};

module.exports = PaperButton;
