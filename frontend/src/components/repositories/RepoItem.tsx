import { ArrowRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RepoItemProps {
  repo: string;
  isNested?: boolean;
  onClick: (repo: string) => void;
}

export const RepoItem = ({ repo, isNested = false, onClick }: RepoItemProps) => {
  const handleClick = () => {
    onClick(repo);
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 ${isNested ? 'pl-8 p-3' : ''} border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer hover:shadow-sm`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <Package className="w-4 h-4 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300" />
        <span className={`font-mono text-sm ${isNested ? '' : 'font-medium'} group-hover:text-slate-900 dark:group-hover:text-slate-100`}>
          {repo}
        </span>
        {!isNested && (
          <Badge variant="secondary" className="text-xs">
            Repository
          </Badge>
        )}
      </div>
      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
    </div>
  );
};