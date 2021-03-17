## Install

```console
$ npm i katex-render
```

## Usage

```js
const katexRender = require('katex-render');

let content = `The Pythagorean Theorem:
$$ A^2 + B^2 = C^2, $$
where $A,B,C$ are right triangle lengths.`;

console.log(katexRender(content));

// The Pythagorean Theorem:
// ... HTML-rendered display math ...
// where ... HTML-rendered inline math ... are right triangle lengths.
```

### Custom KaTeX options

The default KaTeX options are:
* `output: 'html'`
* `strict: false`

You can set your own options.

```js
let customKatexConfig = {
    output: 'mathml',
    strict: true,
    macros: { /* ... */ }
}

katexRender(toRender, { katexOptions: customKatexConfig });
```

### Custom math delimiters

The default math delimiers are:

Display math:
* `$$ ... $$`
* `\[ ... \]`

Inline math:
* `$ ... $`
* `\( ... \)`

You can set your own delimiters by creating two arrays of `RegExp` regular expressions to match display and inline math in your string.

```js
let customDelimiters = {
    display: [
        /\[math\]([\s\S]*?)\[\/math\]/gm // [math] ... [/math]
    ],

    inline: [
        /\[imath\](.*?)\[\/imath\]/g // [imath] ... [/imath]
    ]
}

katexRender(toRender, { mathRegexp: customDelimiters });
```