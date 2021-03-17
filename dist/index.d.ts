import { KatexOptions } from 'katex';
/**
 * Regular expressions to match and render math in strings.
 */
interface MathRegexp {
    display: RegExp[];
    inline: RegExp[];
}
interface RenderOptions {
    mathRegexp?: MathRegexp;
    katexOptions?: KatexOptions;
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
declare function render(toRender: string, renderOptions?: RenderOptions): string;
export = render;
