import { User, Server } from "lucide-react";

interface UserHeaderProps {
  username: string;
  totalRepos: number;
}

export const UserHeader = ({ username, totalRepos }: UserHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border">
      <div className="flex items-center gap-3 mb-2">
        <User className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Welcome, <span className="text-blue-600">{username}</span>
        </h1>
      </div>
      <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <Server className="w-4 h-4" />
        {totalRepos} {totalRepos === 1 ? "repository" : "repositories"} across the registry
      </p>
    </div>
  );
};
