// @author Taehoon Moon
require('../styles');

var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var OptionsManager = require('famous/core/OptionsManager');
var ImageSurface = require('famous/surfaces/ImageSurface');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var SequentialLayout = require('famous/views/SequentialLayout');
var Utility = require('famous/utilities/Utility');

var PaperRipple = require('./PaperRipple');

function PaperButton(options) {
    ContainerSurface.apply(this, arguments);

    this.options = {
        label: {
            size: [true, 36],
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
        }
    };

    if (options)
        OptionsManager.patch(this.options, options);

    if (!options.flat)
        this.addClass('paper-shadow').addClass('paper-border');

    var w = 0;
    var h;
    if (this.options.label.content) {
        if (typeof this.options.label.size[0] === 'number')
            w += this.options.label.size[0];
        else
            w = this.options.label.size[0];

        h = this.options.label.size[1];
    }

    if (this.options.icon.content) {
        if (typeof this.options.icon.size[0] === 'number')
            w += this.options.icon.size[0];
        else
            w = this.options.icon.size[0];

        if (this.options.icon.size[1] > h)
            h = this.options.icon.size[1];
    }
    else {
        w = undefined;
        this.options.label.size[0] = undefined;
        this.options.label.properties.textAlign = 'center';
    }

    var layoutModifier = new Modifier({
        size: [w, h],
        origin: [0, 0.5],
        align: [0, 0.5]
    });

    if (this.options.icon.content)
        layoutModifier.transformFrom(Transform.translate(5, 0));

    var layout = new SequentialLayout({
        direction: Utility.Direction.X
    });

    var items = [];

    if (this.options.icon.content) {
        var imageSurface = new ImageSurface(this.options.icon);
        items.push(imageSurface);
    }

    if (this.options.label.content) {
        var labelSurface = new Surface(this.options.label);
        items.push(labelSurface);
    }

    layout.sequenceFrom(items);

    this.add(layoutModifier).add(layout);

    var rippleModifier = new Modifier({
        transform: Transform.translate(0, 0, 0.01)
    });

    var ripple = new PaperRipple({ ripple: this.options.ripple });
    this.add(rippleModifier).add(ripple);
}

PaperButton.prototype = Object.create(ContainerSurface.prototype);
PaperButton.prototype.constructor = PaperRipple;

module.exports = PaperButton;
