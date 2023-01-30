// @ts-check

/**
 * Create a tag descriptor using hyperscript style
 * @overload
 * @param {string} tag
 * @param {Record<string, string | boolean>} [attrs]
 * @param {...import('vite').HtmlTagDescriptor} children
 * @returns {import('vite').HtmlTagDescriptor}
 */
/**
 * Create a tag descriptor
 * @overload
 * @param {string} tag
 * @param {Record<string, string | boolean> | undefined} attrs
 * @param {string} children
 * @returns {import('vite').HtmlTagDescriptor}
 */
/**
 * Create a tag descriptor
 * @param {string} tag
 * @param {Record<string, string | boolean>} [attrs]
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

  return { tag, attrs, children: childTags };
}

/**
 * @typedef {readonly import('vite').HtmlTagDescriptor[] | ((ctx: import('vite').IndexHtmlTransformContext) => readonly import('vite').HtmlTagDescriptor[])} Tags
 */

/**
 * @param {object} tags
 * @param {Tags} [tags.head]
 * @param {Tags} [tags.headPrepend]
 * @param {Tags} [tags.body]
 * @param {Tags} [tags.bodyPrepend]
 * @returns {import('vite').Plugin}
 */
export function injectTags(tags) {
  return {
    name: 'inject-tags',
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
