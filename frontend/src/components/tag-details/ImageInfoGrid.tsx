import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Package, User, Layers } from "lucide-react";
import { formatBytes } from "@/utils/tag-details";
import type { ImageInfoProps } from "@/types/tag-details";

export default function ImageInfoGrid({ config, totalSize }: ImageInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Created</div>
              <div className="font-medium">{formatDate(config.created)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">OS/Arch</div>
              <div className="font-medium font-mono text-sm">
                {config.os}/{config.architecture}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">User</div>
              <div className="font-medium font-mono text-sm">{config.config?.User || "root"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Size</div>
              <div className="font-medium">{formatBytes(totalSize)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
