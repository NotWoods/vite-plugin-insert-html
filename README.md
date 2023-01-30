# vite-plugin-insert-html

[![](https://img.shields.io/npm/v/vite-plugin-insert-html.svg?style=flat)](https://www.npmjs.com/package/vite-plugin-insert-html)

Super simple Vite plugin to insert HTML into the head or body of your HTML entrypoints.

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
