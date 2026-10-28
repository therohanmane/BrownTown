/**
 * Tiny element builder. All text goes through textContent and attributes
 * through setAttribute, so data (titles, form input, etc.) can never be
 * interpreted as HTML. Use this instead of innerHTML for anything dynamic.
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElementNS(
    tag === 'svg' || props.svg ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml',
    tag
  );
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false || key === 'svg') continue;
    if (key === 'class') el.setAttribute('class', value);
    else if (key === 'text') el.textContent = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2), value);
    else el.setAttribute(key, value === true ? '' : value);
  }
  append(el, children);
  return el;
}

/** SVG element shortcut. */
export const s = (tag, props = {}, ...children) => h(tag, { ...props, svg: true }, ...children);

function append(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

export function clear(el) {
  while (el.firstChild) el.firstChild.remove();
  return el;
}

/** Allows only http(s) links; anything else becomes '#'. */
export function safeUrl(url) {
  try {
    const u = new URL(url, location.href);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '#';
  } catch {
    return '#';
  }
}

export const YT_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Inline SVG icon from the sprite in index.html. */
export const icon = (name, cls = 'icon') =>
  s('svg', { class: cls, 'aria-hidden': 'true', focusable: 'false' }, s('use', { href: `#i-${name}` }));
