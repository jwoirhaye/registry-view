import { useState, useEffect } from "react";
import { getManifest, getImageConfig } from "@/api/registry";
import type { TagDetailsState } from "@/types/tag-details";

export function useTagDetails(repoName?: string, tagName?: string, registryUrl?: string) {
  const [state, setState] = useState<TagDetailsState>({
    manifest: null,
    config: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!repoName || !tagName || !registryUrl) {
      setState((prev) => ({ ...prev, loading: false, error: "Missing required parameters" }));
      return;
    }

    const fetchTagDetails = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const manifest = await getManifest(registryUrl, repoName, tagName);
        setState((prev) => ({ ...prev, manifest }));

        const config = await getImageConfig(registryUrl, repoName, manifest.config.digest);
        setState((prev) => ({ ...prev, config, loading: false }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unable to fetch manifest or config";
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
      }
    };

    fetchTagDetails();
  }, [repoName, tagName, registryUrl]);

  return state;
}
