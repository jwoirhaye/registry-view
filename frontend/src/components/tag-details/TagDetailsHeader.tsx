import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface TagDetailsHeaderProps {
  repoName: string;
  tagName: string;
  digest: string;
}

export default function TagDetailsHeader({ repoName, tagName, digest }: TagDetailsHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border">
      <div className="flex items-center gap-3 mb-3">
        <Package className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{repoName}</h1>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {tagName}
        </Badge>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">{digest}</p>
    </div>
  );
}
