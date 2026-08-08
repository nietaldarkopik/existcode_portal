// Strips undefined-valued keys so optional props can be spread into third-party
// components typed without `exactOptionalPropertyTypes` in mind (e.g. Radix).
export function definedProps<T extends Record<string, unknown>>(
  props: T
): { [K in keyof T]-?: Exclude<T[K], undefined> } {
  const result = {} as Record<string, unknown>;
  for (const key in props) {
    if (props[key] !== undefined) result[key] = props[key];
  }
  return result as { [K in keyof T]-?: Exclude<T[K], undefined> };
}
