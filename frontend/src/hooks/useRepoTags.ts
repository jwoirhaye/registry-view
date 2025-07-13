import { useEffect, useState } from "react";
import { listTags } from "@/api/registry";
import type { TagList } from "@/types/registry";
import { filterTags, sortTags } from "@/utils/tag";

interface UseRepoTagsReturn {
  tags: string[];
  filteredTags: string[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

export const useRepoTags = (repoName: string | undefined): UseRepoTagsReturn => {
  const [tags, setTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!repoName) return;

    const registryUrl = localStorage.getItem("registryUrl") || "http://localhost:8080";
    setLoading(true);
    setError(null);

    listTags(registryUrl, repoName)
      .then((data: TagList) => {
        const tagList = data.tags ?? [];
        setTags(tagList);
      })
      .catch(() => {
        setError("Unable to fetch tags for this repository.");
        setTags([]);
      })
      .finally(() => setLoading(false));
  }, [repoName]);

  const filteredTags = sortTags(filterTags(tags, searchTerm));

  const clearSearch = () => setSearchTerm("");

  return {
    tags,
    filteredTags,
    searchTerm,
    loading,
    error,
    setSearchTerm,
    clearSearch,
  };
};
