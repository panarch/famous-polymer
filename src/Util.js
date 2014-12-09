// famous-polymer
// Taehoon Moon <panarch@kaist.ac.kr>
//
// PaperButton
//
// Copyright Taehoon Moon 2014

define(function(require, exports, module) {
    function Util() {}

    Util.Position = {
        LEFT: 1,
        RIGHT: 2
    };

    Util.format = function() {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var regEx = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(regEx, arguments[i]);
        }

        return str;
    };

    module.exports = Util;
});
