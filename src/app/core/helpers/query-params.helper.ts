export function buildQueryParams(
  params?: Record<string, string | number | boolean | null | undefined>
): Record<string, string> {
  return Object.entries(params ?? {}).reduce((acc, [key, value]) => {
    if (value === null || value === undefined || value === '') {
      return acc;
    }

    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);
}
