/**
 * Combines multiple class names into a single string, filtering out falsy values.
 * This is similar to the classnames or clsx libraries.
 *
 * @param  {...any} classes - The class names to combine
 * @returns {string} The combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
