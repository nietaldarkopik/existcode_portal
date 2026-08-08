export function buildPath<L extends string>(template: Record<L, string>, locale: L, params?: Record<string, string>): string {
  let path = template[locale];

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
  }

  return path;
}
