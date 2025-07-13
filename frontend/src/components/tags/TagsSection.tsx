import { Search, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TagItem } from "./TagItem";
import { LoadingState, ErrorState, NoResultsState, EmptyRepositoryState, SearchResultsFooter } from "./EmptyStates";

interface TagsSectionProps {
  repoName: string;
  tags: string[];
  filteredTags: string[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  onTagClick: (repoName: string, tag: string) => void;
}

export const TagsSection = ({
  repoName,
  tags,
  filteredTags,
  searchTerm,
  loading,
  error,
  onSearchChange,
  onClearSearch,
  onTagClick,
}: TagsSectionProps) => {
  const showSearchResults = searchTerm && filteredTags.length > 0;
  const showNoResults = searchTerm && filteredTags.length === 0;
  const showEmptyRepo = !loading && !error && !searchTerm && filteredTags.length === 0;
  const showTagList = !loading && !error && filteredTags.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Tags
            {!loading && !error && (
              <Badge variant="outline" className="ml-2">
                {filteredTags.length}
              </Badge>
            )}
          </CardTitle>
          {tags.length > 0 && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search tags..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="pl-10" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading && <LoadingState />}

        {error && <ErrorState message={error} />}

        {showNoResults && <NoResultsState searchTerm={searchTerm} onClearSearch={onClearSearch} />}

        {showEmptyRepo && <EmptyRepositoryState />}

        {showTagList && (
          <>
            <div className="space-y-2">
              {filteredTags.map((tag) => (
                <TagItem key={tag} tag={tag} repoName={repoName} onClick={onTagClick} />
              ))}
            </div>

            {showSearchResults && <SearchResultsFooter filteredCount={filteredTags.length} totalCount={tags.length} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
