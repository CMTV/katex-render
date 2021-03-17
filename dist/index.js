"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var katex_1 = require("katex");
var Defaults = /** @class */ (function () {
    function Defaults() {
    }
    Defaults.mathRegexp = {
        display: [
            /^\$\$([\s\S]*?)\$\$$/gm,
            /^\\\[([\s\S]*?)\\\]$/gm // \[ ... \]
        ],
        inline: [
            /(?<!\$)\$(?!\$)(.*?)\$/g,
            /\\\((.*?)\\\)/g // \( ... \)
        ]
    };
    Defaults.katexOptions = {
        output: 'html',
        strict: false
    };
    return Defaults;
}());
/**
 * Finds all math expressions in `toRender` which matches `renderOptions.mathRegexp` regular expressions and replaces them
 * with rendered ones according to KaTeX options from `renderOptions.katexOptions`.
 *
 * Default display math:
 * * `$$ ... $$`
 * * `\[ ... \]`
 *
 * Default inline math:
 * * `$ ... $`
 * * `\( ... \)`
 *
 * Default KaTeX options:
 * * `output: 'html'`
 * * `strict: false`
 *
 * @returns Returns a `toRender` string with rendered math expressions according to `renderOptions`.
 */
function render(toRender, renderOptions) {
    renderOptions = setupOptions(renderOptions);
    var mathRegexp = renderOptions.mathRegexp;
    var katexOptions = __assign(__assign({}, Defaults.katexOptions), renderOptions.katexOptions);
    if (typeof toRender !== 'string')
        return '';
    var options = function (isDisplay) {
        return __assign(__assign({}, katexOptions), { displayMode: isDisplay });
    };
    mathRegexp.display.forEach(function (regexp) {
        toRender = toRender.replace(regexp, function (match, math) { return katex_1.renderToString(math, options(true)); });
    });
    mathRegexp.inline.forEach(function (regexp) {
        toRender = toRender.replace(regexp, function (match, math) { return katex_1.renderToString(math, options(false)); });
    });
    return toRender;
}
function setupOptions(renderOptions) {
    if (!renderOptions)
        renderOptions = { mathRegexp: Defaults.mathRegexp, katexOptions: Defaults.katexOptions };
    if (!('mathRegexp' in renderOptions))
        renderOptions.mathRegexp = Defaults.mathRegexp;
    if (!('katexOptions' in renderOptions))
        renderOptions.katexOptions = Defaults.katexOptions;
    return renderOptions;
}
module.exports = render;
