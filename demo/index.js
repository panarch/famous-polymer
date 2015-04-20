// @author Taehoon Moon 2015

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var SequentialLayout = require('famous/views/SequentialLayout');
var PaperRipple = require('../paper/PaperRipple');
var PaperButton = require('../paper/PaperButton');
var PaperCheckbox = require('../paper/PaperCheckbox');
var PaperRadioButton = require('../paper/PaperRadioButton');

var _mainContext = Engine.createContext();

var _rippleModifier = new Modifier({
    size: [150, 150],
    transform: Transform.translate(50, 120)
});

var _ripple = new PaperRipple({
    classes: ['paper-shadow', 'paper-border'],
    ripple: {
        size: [300, 300],
        duration: 500,
        properties: {
            backgroundColor: 'rgba(200, 0, 200, 0.2)'
        }
    }
});

var _buttonModifier = new Modifier({
    size: [150, 50],
    transform: Transform.translate(50, 50)
});

var _button = new PaperButton({
    icon: {
        //content: './assets/appbar.arrow.left.svg'
        content: '../node_modules/material-design-icons/av/svg/production/ic_play_arrow_48px.svg'
    },
    label: {
        content: 'Click me!'
    },
    ripple: {
        properties: {
            //backgroundColor: 'rgba(200, 200, 0, 0.4)'
        }
    }
});

var _checkboxModifier = new Modifier({
    size: [150, 50],
    transform: Transform.translate(50, 290)
});

var _checkbox = new PaperCheckbox({
    checked: false,
    label: {
        content: 'Check me!'
    }
});

var _checkboxModifier2 = new Modifier({
    size: [47, 47],
    transform: Transform.translate(50, 340)
});

var _checkbox2 = new PaperCheckbox({
    checked: false,
    color: '#4283f4'
});

var _radioGroupModifier = new Modifier({
    size: [150, 100],
    transform: Transform.translate(50, 390)
});

var _radioGroupLayout = new SequentialLayout();

var _radioButton = new PaperRadioButton({
    size: [150, 47],
    checked: true,
    label: {
        content: 'Select me!'
    }
});

var _radioButton2 = new PaperRadioButton({
    size: [47, 47],
    checked: false
});

_radioButton.on('change', function(checked) {
    _radioButton2.setChecked(false);
});

_radioButton2.on('change', function(checked) {
    _radioButton.setChecked(false);
});

_radioGroupLayout.sequenceFrom([_radioButton, _radioButton2]);

_mainContext.add(_rippleModifier).add(_ripple);
_mainContext.add(_buttonModifier).add(_button);
_mainContext.add(_checkboxModifier).add(_checkbox);
_mainContext.add(_checkboxModifier2).add(_checkbox2);
_mainContext.add(_radioGroupModifier).add(_radioGroupLayout);
