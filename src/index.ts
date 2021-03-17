import { renderToString, KatexOptions } from 'katex';

/**
 * Regular expressions to match and render math in strings.
 */
interface MathRegexp
{
    display: RegExp[];
    inline:  RegExp[];
}

class Defaults
{
    static mathRegexp: MathRegexp = 
    {
        display: [
            /^\$\$([\s\S]*?)\$\$$/gm,   // $$ ... $$
            /^\\\[([\s\S]*?)\\\]$/gm    // \[ ... \]
        ],
    
        inline: [
            /(?<!\$)\$(?!\$)(.*?)\$/g,  //  $ ... $
            /\\\((.*?)\\\)/g            // \( ... \)
        ]
    }

    static katexOptions: KatexOptions =
    {
        output: 'html',
        strict: false
    }
}

interface RenderOptions
{
    mathRegexp?: MathRegexp,
    katexOptions?: KatexOptions
}

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
function render(
    toRender: string,
    renderOptions?: RenderOptions
)
{
    renderOptions = setupOptions(renderOptions);

    let mathRegexp = renderOptions.mathRegexp;
    let katexOptions = {...Defaults.katexOptions, ...renderOptions.katexOptions}

    if (typeof toRender !== 'string') return '';

    let options = (isDisplay: boolean) =>
    {
        return {...katexOptions, ...{ displayMode: isDisplay }}
    }

    mathRegexp.display.forEach((regexp) =>
    {
        toRender = toRender.replace(regexp, (match, math) => { return renderToString(math, options(true)); });
    });

    mathRegexp.inline.forEach((regexp) =>
    {
        toRender = toRender.replace(regexp, (match, math) => { return renderToString(math, options(false)); });
    });

    return toRender;
}

function setupOptions(renderOptions: RenderOptions): RenderOptions
{
    if (!renderOptions)
        renderOptions = { mathRegexp: Defaults.mathRegexp, katexOptions: Defaults.katexOptions };

    if (!('mathRegexp' in renderOptions))
        renderOptions.mathRegexp = Defaults.mathRegexp;
    
    if (!('katexOptions' in renderOptions))
        renderOptions.katexOptions = Defaults.katexOptions;

    return renderOptions;
}

export = render;