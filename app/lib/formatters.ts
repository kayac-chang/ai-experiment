/**
 * Formats numbers as percentages using US locale
 *
 * Uses Intl.NumberFormat to format numbers as percentages with up to 2 decimal places.
 * For example:
 * - 0.156 -> "15.6%"
 * - 1.0 -> "100%"
 * - 0.033 -> "3.3%"
 */
export const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
});

/**
 * Formats numbers using compact notation (abbreviated form)
 *
 * Uses Intl.NumberFormat to format large numbers in a more readable way.
 * For example:
 * - 1000 -> "1K"
 * - 1000000 -> "1M"
 * - 1000000000 -> "1B"
 */
export const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});
