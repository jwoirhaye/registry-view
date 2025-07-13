import { useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useRepositories } from "@/hooks/useRepositories";
import { useUserInfo } from "@/hooks/useUserInfo";
import { UserHeader } from "@/components/repositories/UserHeader";
import { RepositoriesSection } from "@/components/repositories/RepositoriesSection";

export default function Home() {
  const navigate = useNavigate();
  const { username } = useUserInfo();

  const { repos, filteredRepos, organizedRepos, searchTerm, loading, error, setSearchTerm, clearSearch } = useRepositories();

  const handleRepoClick = (repo: string) => {
    navigate(`/repo/${encodeURIComponent(repo)}`);
  };

  return (
    <div className="space-y-6">
      <UserHeader username={username} totalRepos={repos.length} />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Repositories</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RepositoriesSection
        repos={repos}
        filteredRepos={filteredRepos}
        organizedRepos={organizedRepos}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        onSearchChange={setSearchTerm}
        onClearSearch={clearSearch}
        onRepoClick={handleRepoClick}
      />
    </div>
  );
}
