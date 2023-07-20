import type { Tag } from '../tag'

export function assertUnreachable(value: never): never {
  throw new Error(`Should not reach this with value ${value}`)
}

export const tagString = (record: Tag): string =>
  `{ ${Object.entries(record)
    .map(([k, v]) => `${k}:${v}`)
    .join(' ')} }`

export const extract = <V, K extends keyof V>(arr: V[], key: K): V[K][] =>
  arr.map((v) => v[key])
