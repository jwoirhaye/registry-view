import { GitBranch, Package } from "lucide-react";

interface RepoHeaderProps {
  repoName: string;
  tagCount: number;
}

export const RepoHeader = ({ repoName, tagCount }: RepoHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border">
      <div className="flex items-center gap-3 mb-2">
        <Package className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{repoName}</h1>
      </div>
      <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <GitBranch className="w-4 h-4" />
        Repository with {tagCount} tag{tagCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
};
