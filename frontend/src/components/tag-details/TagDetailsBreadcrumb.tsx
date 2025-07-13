import { useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface TagDetailsBreadcrumbProps {
  repoName: string;
  tagName: string;
}

export default function TagDetailsBreadcrumb({ repoName, tagName }: TagDetailsBreadcrumbProps) {
  const navigate = useNavigate();

  const handleRepositoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleRepoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/repo/${encodeURIComponent(repoName)}`);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" onClick={handleRepositoriesClick}>
            Repositories
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/repo/${encodeURIComponent(repoName)}`} onClick={handleRepoClick}>
            {repoName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{tagName}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
