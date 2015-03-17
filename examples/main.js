// Copyright Taehoon Moon 2014

/* globals define */
define(function(require, exports, module) {
    'use strict';
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var GridLayout = require('famous/views/GridLayout');
    var Utility = require('famous/utilities/Utility');
    var PaperButton = require('../src/PaperButton');
    var PaperSlider = require('../src/PaperSlider');
    var PaperCheckbox = require('../src/PaperCheckbox');
    var PaperDropdownMenu = require('../src/PaperDropdownMenu');
    var CoreSelector = require('../src/CoreSelector');
    var Util = require('../src/Util');

    var mainContext = Engine.createContext();

    var tapCount = 0;
    var holdCount = 0;
    var holdPulseCount = 0;
    var releaseCount = 0;

    var tapSurface = new Surface({ size: [true, true], content: 'tap: 0' });
    var holdSurface = new Surface({ size: [true, true], content: 'hold: 0' });
    var holdPulseSurface = new Surface({ size: [true, true], content: 'hold pulse: 0' });
    var releaseSurface = new Surface({ size: [true, true], content: 'release: 0' });
    var selectSurface = new Surface({ size: [true, true], content: 'selected: ' });

    var layout = new SequentialLayout({
        direction: Utility.Direction.Y
    });

    var layoutModifier = new Modifier({
        size: [true, true],
        transform: Transform.translate(10, 10)
    });

    layout.sequenceFrom([
        tapSurface,
        holdSurface,
        holdPulseSurface,
        releaseSurface,
        selectSurface
    ]);
    mainContext.add(layoutModifier).add(layout);

    var modifier = new Modifier({
        size: [600, 200],
        transform: Transform.translate(200, 50)
    });

    var grid = new GridLayout({
        dimensions: [2, 2]
    });

    var button1 = new PaperButton({
        size: [true, true],
        label: {
            text: 'true sized button',
            flex: true
        },
        icon: {
            src: 'menu',
            position: Util.Position.LEFT
        },
        attributes: {
            raised: true
        }
    });

    var button2 = new PaperButton({
        size: [250, true],
        label: 'text button',
        attributes: {
            raised: true
        }
    });

    var button3 = new PaperButton({
        size: [250, true],
        label: 'left icon button',
        icon: 'menu',
        attributes: {
            raised: false
        },
        properties: {
            backgroundColor: '#eaeaea'
        }
    });

    var button4 = new PaperButton({
        size: [250, true],
        label: {
            text: 'right icon button',
            flex: true
        },
        icon: {
            src: 'menu',
            position: Util.Position.RIGHT
        },
        attributes: {
            raised: true
        },
        properties: {
            textAlign: 'left'
        }
    });

    function onTap() {
        tapSurface.setContent('tap: ' + ++tapCount);
    }
    function onHold() {
        holdSurface.setContent('hold: ' + ++holdCount);
    }
    function onHoldPulse() {
        holdPulseSurface.setContent('hold pulse: ' + ++holdPulseCount);
    }
    function onRelease() {
        releaseSurface.setContent('release: ' + ++releaseCount);
    }

    var buttons = [button1, button2, button3, button4];
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].on('tap', onTap);
        buttons[i].on('hold', onHold);
        buttons[i].on('holdpulse', onHoldPulse);
        buttons[i].on('release', onRelease);
    }

    grid.sequenceFrom(buttons);

    mainContext.add(modifier).add(grid);

    // slider
    var slider = new PaperSlider({
        size: [400, true],
        classes: ['test'],
        attributes: {
            snaps: true,
            step: 1,
            max: 5,
            value: 3
        }
    });
    var sliderModifier = new Modifier({
        transform: Transform.translate(100, 300)
    });
    mainContext.add(sliderModifier).add(slider);

    // checkbox
    var checkbox = new PaperCheckbox({
        size: [true, true],
        attributes: {
            label: 'Notifications'
        }
    });

    checkbox.setChecked(true);

    checkbox.on('tap', function() {
        checkbox.setChecked(!checkbox.getChecked());
    });

    var checkboxModifier = new Modifier({
        transform: Transform.translate(100, 350)
    });

    mainContext.add(checkboxModifier).add(checkbox);

    // dropdown menu
    var dropdownMenu = new PaperDropdownMenu({
        size: [150, true],
        attributes: {
            label: 'Choose Item'
        },
        dropdownHeight: 150,
        items: [
            { value: 'item0', text: 'Item 0' },
            { value: 'item1', text: 'Item 1' },
            { value: 'item2', text: 'Item 2' },
            { value: 'item3', text: 'Item 3' },
            { value: 'item4', text: 'Item 4' },
            { value: 'item5', text: 'Item 5' },
            { value: 'item6', text: 'Item 6' },
            { value: 'item7', text: 'Item 7' },
            { value: 'item8', text: 'Item 8' }
        ]
    });

    dropdownMenu.on('core-select', function(e) {
        var detail = e.detail;
        if (!detail.isSelected)
            return;

        var value = detail.item.getAttribute('value');
        selectSurface.setContent('selected : ' + value);
    });

    var dropdownMenuModifier = new Modifier({
        transform: Transform.translate(600, 280)
    });

    mainContext.add(dropdownMenuModifier).add(dropdownMenu);

    // core selector
    var coreSelector = new CoreSelector({
        size: [150, true],
        items: [
            { value: 'item0', text: 'Item 0' },
            { value: 'item1', text: 'Item 1' },
            { value: 'item2', text: 'Item 2' }
        ],
        properties: {
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
        }
    });

    coreSelector.on('core-select', function(e) {
        var detail = e.detail;
        if (!detail.isSelected)
            return;

        var value = detail.item.getAttribute('value');
        selectSurface.setContent('selected : ' + value);
    });

    var coreSelectorModifier = new Modifier({
        transform: Transform.translate(720, 280)
    });

    mainContext.add(coreSelectorModifier).add(coreSelector);
});
