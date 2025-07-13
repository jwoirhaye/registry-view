import { useEffect, useState } from "react";
import { listRepositories } from "@/api/registry";
import type { RepositoryList } from "@/types/registry";
import { filterRepos, organizeRepos, sortRepos } from "@/utils/repositories";
import type { OrganizedRepos } from "@/utils/repositories";

interface UseRepositoriesReturn {
  repos: string[];
  filteredRepos: string[];
  organizedRepos: OrganizedRepos;
  searchTerm: string;
  loading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

export const useRepositories = (): UseRepositoriesReturn => {
  const [repos, setRepos] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const registryUrl = localStorage.getItem("registryUrl") || "http://localhost:8080";

    setLoading(true);
    setError(null);

    listRepositories(registryUrl)
      .then((data: RepositoryList) => {
        const repoList = data.repositories ?? [];
        const sortedRepos = sortRepos(repoList);
        setRepos(sortedRepos);
      })
      .catch(() => {
        setError("Unable to fetch repositories.");
        setRepos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRepos = filterRepos(repos, searchTerm);

  const organizedRepos = organizeRepos(filteredRepos);

  const clearSearch = () => setSearchTerm("");

  return {
    repos,
    filteredRepos,
    organizedRepos,
    searchTerm,
    loading,
    error,
    setSearchTerm,
    clearSearch,
  };
};
