# vite-plugin-insert-html [![](https://img.shields.io/npm/v/vite-plugin-insert-html.svg?style=flat)](https://www.npmjs.com/package/vite-plugin-insert-html)

Super simple Vite plugin to insert HTML into the head or body of your HTML entrypoints.

Are you building a [multi-page app](https://vitejs.dev/guide/build.html#multi-page-app) where you want to include the same HTML tags in every page? Links to favicons, global CSS, social metadata, analytics scripts, any any HTML that you can think of can be easily injected to every page in your Vite app.

This plugin takes advantage of Vite's existing HTML serializer, and has no other dependencies. Simply specify the tags you want to insert, grouped by location.

## Installation

```bash
npm install --save-dev vite-plugin-insert-html
```

## Usage

```js
// vite.config.js
import { insertHtml, h } from 'vite-plugin-insert-html';

export default {
  plugins: [
    insertHtml({
      head: [
        h('meta', {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        }),
      ],
      body: [h('script', { src: 'analytics.js' })],
    }),
  ],
};
```

## `insertHtml`

`insertHtml({ head?, headPrepend?, body?, bodyPrepend? })`

### `head`, `headPrepend`, `body`, `bodyPrepend`

- **Type:** `HtmlTagDescriptor[] | (context: IndexHtmlTransformContext) => HtmlTagDescriptor[]`
- **Default:** `[]`

List of tags to insert into the HTML, represented as [Vite tag descriptor objects](https://vitejs.dev/guide/api-plugin.html#transformindexhtml).

Tag descriptors are objects with the following properties:
- `tag`: the HTML tag name, such as `div` or `meta`.
- `attrs`: an object containing attribute names and string values. `true` can also be used for attributes without corresponding values.
- `children`: an array of other tag descriptor objects. Can also be an HTML string.

Instead of passing an array in directly, you can also pass in a function that lets you use a transform context while creating the tags. The transform context includes:
- `path` that corresponds to the given HTML page, as a URL.
- `filename` of the original HTML file.
- `server`: a reference to the [Vite dev server](https://vitejs.dev/guide/api-javascript.html#vitedevserver) when running in development mode.
- `bundle` and `chunk`: references to the Rollup output bundle during build mode.

## `h`

`h(tag, attrs, ...children)`

A helper function for creating tag descriptor objects. Follows a similar format to [Preact](https://preactjs.com/guide/v10/api-reference#h--createelement) and Hyperscript.

- `tag`: the HTML tag name, such as `div` or `meta`.
- `attrs`: an object containing attribute names and string values. `true` can also be used for attributes without corresponding values.
- `children`: other tag descriptor objects. Can also be an HTML string.
