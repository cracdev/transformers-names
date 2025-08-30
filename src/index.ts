import uniqueRandomArray from 'unique-random-array'
import { transformers } from './transformers'

// Type assertion to ensure we have a non-empty array of strings

const getRandomItem = uniqueRandomArray(transformers)

/**
 * Get a random transformer name or multiple random names
 * @param count - Number of random names to return. If not provided, returns a single name
 * @returns A single transformer name or array of names
 */
export function random(): string
export function random(count: number): string[]

export function random(count?: number): string | string[] {
  if (count === undefined) {
    return getRandomItem()
  }

  const randomItems: string[] = []
  for (let i = 0; i < count; i++) {
    randomItems.push(getRandomItem())
  }
  return randomItems
}

/**
 * All transformer names
 */
export const all: readonly string[] = transformers

// Default export for backward compatibility
export default {
  all: transformers,
  random,
}
