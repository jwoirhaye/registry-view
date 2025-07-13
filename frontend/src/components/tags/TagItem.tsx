import { ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTagVariant, getTagLabel } from "@/utils/tag";

interface TagItemProps {
  tag: string;
  repoName: string;
  onClick: (repoName: string, tag: string) => void;
}

export const TagItem = ({ tag, repoName, onClick }: TagItemProps) => {
  const handleClick = () => {
    onClick(repoName, tag);
  };

  return (
    <div
      className="group flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer hover:shadow-sm"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <Tag className="w-4 h-4 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300" />
        <span className="font-mono text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100">{tag}</span>
        <Badge variant={getTagVariant(tag)} className="text-xs">
          {getTagLabel(tag)}
        </Badge>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
    </div>
  );
};
