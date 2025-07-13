/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Calculate total size of all layers
 */
export function calculateTotalSize(layers: Array<{ size: number }>): number {
  return layers.reduce((sum, layer) => sum + layer.size, 0);
}

/**
 * Generate docker pull command
 */
export function generatePullCommand(registryUrl: string, repo: string, tag: string): string {
  const cleanRegistryUrl = registryUrl.replace(/^https?:\/\//, "");
  return `docker pull ${cleanRegistryUrl}/${repo}:${tag}`;
}

/**
 * Copy text to clipboard and show toast notification
 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
  // Note: toast should be imported and called from the component
}
