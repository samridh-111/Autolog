// src/lib/utils.js

/**
 * Conditionally joins class names into a single string.
 * Example: cn('bg-red', isActive && 'text-white') => "bg-red text-white"
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
