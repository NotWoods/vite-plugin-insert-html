// @ts-check

/**
 * Create a tag descriptor using hyperscript style
 * @overload
 * @param {string} tag
 * @param {Record<string, string | boolean> | null} [attrs]
 * @param {...import('vite').HtmlTagDescriptor} children
 * @returns {import('vite').HtmlTagDescriptor}
 */
/**
 * Create a tag descriptor
 * @overload
 * @param {string} tag
 * @param {Record<string, string | boolean> | null | undefined} attrs
 * @param {string} children
 * @returns {import('vite').HtmlTagDescriptor}
 */
/**
 * Create a tag descriptor
 * @param {string} tag
 * @param {Record<string, string | boolean> | null} [attrs]
 * @param {...(string | import('vite').HtmlTagDescriptor)} children
 * @returns {import('vite').HtmlTagDescriptor}
 */
export function h(tag, attrs, ...children) {
  /** @type {string | import('vite').HtmlTagDescriptor[]} */
  let childTags;
  if (typeof children[0] === 'string') {
    childTags = children[0];
  } else {
    childTags = /** @type {import('vite').HtmlTagDescriptor[]} */ (children);
  }

  return { tag, attrs: attrs || undefined, children: childTags };
}

/**
 * @typedef {readonly import('vite').HtmlTagDescriptor[] | ((ctx: import('vite').IndexHtmlTransformContext) => readonly import('vite').HtmlTagDescriptor[])} Tags
 */

/**
 * Insert additional tags into every Vite HTML entrypoint.
 * @param {object} tags Tags to insert
 * @param {Tags} [tags.head] Tags to insert before the closing `</head>` tag
 * @param {Tags} [tags.headPrepend] Tags to insert after the opening `<head>` tag
 * @param {Tags} [tags.body] Tags to insert before the closing `</body>` tag
 * @param {Tags} [tags.bodyPrepend] Tags to insert after the opening `<body>` tag
 * @returns {import('vite').Plugin}
 */
export function insertHtml(tags) {
  return {
    name: 'insert-html',
    transformIndexHtml(html, context) {
      /**
       * @param {Tags | undefined} tags
       * @param {import('vite').HtmlTagDescriptor['injectTo']} location
       */
      function injectTo(tags = [], location) {
        if (typeof tags === 'function') {
          tags = tags(context);
        }
        return tags.map((tag) => {
          tag.injectTo = location;
          return tag;
        });
      }

      return [
        ...injectTo(tags.head, 'head'),
        ...injectTo(tags.headPrepend, 'head-prepend'),
        ...injectTo(tags.body, 'body'),
        ...injectTo(tags.bodyPrepend, 'body-prepend'),
      ];
    },
  };
}
