/**
 * Encode registry URL for use as query parameter
 * Removes trailing slashes and URL encodes the result
 */
export const encodeRegistry = (url: string): string => {
  return encodeURIComponent(url.replace(/\/+$/, ""));
};

/**
 * Build API URL with registry parameter
 */
export const buildApiUrl = (baseUrl: string, endpoint: string, registryUrl: string): string => {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${baseUrl}${endpoint}${separator}registry_url=${encodeRegistry(registryUrl)}`;
};

/**
 * Handle fetch response with error checking
 */
export const handleFetchResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
