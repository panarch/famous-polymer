// @author Taehoon Moon 2015

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var PaperRipple = require('../paper/PaperRipple');

var _mainContext = Engine.createContext();

var _rippleModifier = new Modifier({
    size: [150, 150],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
});

var _ripple = new PaperRipple({
    classes: ['shadow'],
    ripple: {
        size: [120, 120],
        duration: 1000,
        properties: {
            backgroundColor: 'rgba(200, 0, 200, 0.2)'
        }
    },
    properties: {
        borderRadius: '200px'
    }
});

_mainContext.add(_rippleModifier).add(_ripple);
