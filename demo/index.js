// @author Taehoon Moon 2015

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var PaperRipple = require('../paper/PaperRipple');
var PaperButton = require('../paper/PaperButton');
var PaperCheckbox = require('../paper/PaperCheckbox');

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
    size: [50, 50],
    transform: Transform.translate(50, 290)
});

var _checkbox = new PaperCheckbox({
    checked: false
});

_mainContext.add(_rippleModifier).add(_ripple);
_mainContext.add(_buttonModifier).add(_button);
_mainContext.add(_checkboxModifier).add(_checkbox);
