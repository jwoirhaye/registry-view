import { REGISTRY_CONFIG } from "../config/registry";
import type { 
  RepositoryList, 
  TagList, 
  Manifest, 
  ImageConfig 
} from "../types/registry";
import { 
  buildApiUrl, 
  handleFetchResponse 
} from "../utils/registry";

/**
 * Check if registry supports Docker Registry HTTP API V2
 */
export async function isV2Registry(registryUrl: string): Promise<boolean> {
  const url = buildApiUrl(REGISTRY_CONFIG.API_BASE, "/v2/", registryUrl);
  
  try {
    const response = await fetch(url);
    
    // Accept both 200 (OK) and 401 (Unauthorized) as valid responses
    if (response.status === 200 || response.status === 401) {
      const apiVersion = response.headers.get("docker-distribution-api-version");
      return apiVersion === REGISTRY_CONFIG.DOCKER_API_VERSION;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking registry version:", error);
    return false;
  }
}

/**
 * List all repositories in the registry
 */
export async function listRepositories(registryUrl: string): Promise<RepositoryList> {
  const url = buildApiUrl(REGISTRY_CONFIG.API_BASE, "/v2/_catalog", registryUrl);
  const response = await fetch(url);
  
  return handleFetchResponse<RepositoryList>(response, "Failed to fetch repositories");
}

/**
 * List all tags for a given repository
 */
export async function listTags(registryUrl: string, repository: string): Promise<TagList> {
  const encodedRepo = encodeURIComponent(repository);
  const endpoint = `/v2/${encodedRepo}/tags/list`;
  const url = buildApiUrl(REGISTRY_CONFIG.API_BASE, endpoint, registryUrl);
  
  const response = await fetch(url);
  return handleFetchResponse<TagList>(response, "Failed to fetch tags");
}

/**
 * Get manifest for a specific repository and tag/digest
 */
export async function getManifest(
  registryUrl: string, 
  repository: string, 
  reference: string
): Promise<Manifest> {
  const encodedRepo = encodeURIComponent(repository);
  const encodedRef = encodeURIComponent(reference);
  const endpoint = `/v2/${encodedRepo}/manifests/${encodedRef}`;
  const url = buildApiUrl(REGISTRY_CONFIG.API_BASE, endpoint, registryUrl);
  
  const response = await fetch(url, {
    headers: {
      Accept: REGISTRY_CONFIG.DOCKER_MANIFEST_MEDIA_TYPE,
    },
  });
  
  return handleFetchResponse<Manifest>(response, "Failed to fetch manifest");
}

/**
 * Get image configuration blob
 */
export async function getImageConfig(
  registryUrl: string, 
  repository: string, 
  digest: string
): Promise<ImageConfig> {
  const encodedRepo = encodeURIComponent(repository);
  const encodedDigest = encodeURIComponent(digest);
  const endpoint = `/v2/${encodedRepo}/blobs/${encodedDigest}`;
  const url = buildApiUrl(REGISTRY_CONFIG.API_BASE, endpoint, registryUrl);
  
  const response = await fetch(url);
  return handleFetchResponse<ImageConfig>(response, "Failed to fetch image config");
}