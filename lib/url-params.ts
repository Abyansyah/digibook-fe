export function updateURLParams(params: URLSearchParams, updates: Record<string, string>) {
  const newParams = new URLSearchParams(params.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  });

  return newParams.toString();
}
