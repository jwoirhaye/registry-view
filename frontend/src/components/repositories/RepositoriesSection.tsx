import { Search, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RepoItem } from "./RepoItem";
import { NamespaceAccordion } from "./NamespaceAccordion";
import { LoadingState, ErrorState, NoResultsState, EmptyRegistryState, SearchResultsFooter } from "./EmptyStates";
import type { OrganizedRepos } from "@/utils/repositories";

interface RepositoriesSectionProps {
  repos: string[];
  filteredRepos: string[];
  organizedRepos: OrganizedRepos;
  searchTerm: string;
  loading: boolean;
  error: string | null;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  onRepoClick: (repo: string) => void;
}

export const RepositoriesSection = ({
  repos,
  filteredRepos,
  organizedRepos,
  searchTerm,
  loading,
  error,
  onSearchChange,
  onClearSearch,
  onRepoClick,
}: RepositoriesSectionProps) => {
  const { grouped, standalone } = organizedRepos;

  const showSearchResults = searchTerm && filteredRepos.length > 0;
  const showNoResults = searchTerm && filteredRepos.length === 0;
  const showEmptyRegistry = !loading && !error && !searchTerm && filteredRepos.length === 0;
  const showRepoList = !loading && !error && filteredRepos.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Repositories
            {!loading && !error && (
              <Badge variant="outline" className="ml-2">
                {filteredRepos.length}
              </Badge>
            )}
          </CardTitle>
          {repos.length > 0 && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading && <LoadingState />}

        {error && <ErrorState message={error} />}

        {showNoResults && <NoResultsState searchTerm={searchTerm} onClearSearch={onClearSearch} />}

        {showEmptyRegistry && <EmptyRegistryState />}

        {showRepoList && (
          <>
            <div className="space-y-2">
              {standalone.map((repo) => (
                <RepoItem key={repo} repo={repo} onClick={onRepoClick} />
              ))}

              <NamespaceAccordion groupedRepos={grouped} onRepoClick={onRepoClick} />
            </div>

            {showSearchResults && <SearchResultsFooter filteredCount={filteredRepos.length} totalCount={repos.length} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
