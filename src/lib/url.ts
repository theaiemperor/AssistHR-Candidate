export function removeQueryParam(url: string, paramToRemove: string): string {
  const [baseUrl, queryString] = url.split('?');

  if (!queryString) return url;

  const searchParams = new URLSearchParams(queryString);
  searchParams.delete(paramToRemove);

  const newQuery = searchParams.toString();
  return newQuery ? `${baseUrl}?${newQuery}` : baseUrl;
}
