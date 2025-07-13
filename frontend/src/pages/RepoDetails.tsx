import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useRepoTags } from "@/hooks/useRepoTags";
import { RepoHeader } from "@/components/tags/RepoHeader";
import { TagsSection } from "@/components/tags/TagsSection";

export default function RepoDetails() {
  const { repoName } = useParams<{ repoName: string }>();
  const navigate = useNavigate();

  const { tags, filteredTags, searchTerm, loading, error, setSearchTerm, clearSearch } = useRepoTags(repoName);

  const handleTagClick = (repoName: string, tag: string) => {
    navigate(`/repo/${encodeURIComponent(repoName)}/tag/${encodeURIComponent(tag)}`);
  };

  const handleBreadcrumbClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  if (!repoName) {
    return <div className="text-center py-8 text-red-500">Repository name is required</div>;
  }

  return (
    <div className="space-y-6">
      <RepoHeader repoName={repoName} tagCount={tags.length} />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" onClick={handleBreadcrumbClick}>
              Repositories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{repoName}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TagsSection
        repoName={repoName}
        tags={tags}
        filteredTags={filteredTags}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        onSearchChange={setSearchTerm}
        onClearSearch={clearSearch}
        onTagClick={handleTagClick}
      />
    </div>
  );
}
