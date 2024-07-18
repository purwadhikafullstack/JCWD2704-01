export function reqBodyReducer(data: Record<string, any>) {
  const entries = Object.entries(data).reduce((arr: any[], [key, value]) => {
    value && arr.push([key, value]);
    return arr;
  }, []);
  return Object.fromEntries(entries);
}
