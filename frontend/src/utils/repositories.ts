export interface OrganizedRepos {
  grouped: { [key: string]: string[] };
  standalone: string[];
}

export const organizeRepos = (repositories: string[]): OrganizedRepos => {
  const grouped: { [key: string]: string[] } = {};
  const standalone: string[] = [];

  repositories.forEach((repo) => {
    if (repo.includes("/")) {
      const namespace = repo.split("/")[0];

      if (!grouped[namespace]) {
        grouped[namespace] = [];
      }
      grouped[namespace].push(repo);
    } else {
      standalone.push(repo);
    }
  });

  return { grouped, standalone };
};

export const filterRepos = (repos: string[], searchTerm: string): string[] => {
  if (searchTerm.trim() === "") return repos;

  return repos.filter((repo) => repo.toLowerCase().includes(searchTerm.toLowerCase()));
};

export const sortRepos = (repos: string[]): string[] => {
  return [...repos].sort((a, b) => a.localeCompare(b));
};
