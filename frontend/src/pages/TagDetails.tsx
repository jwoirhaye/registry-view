import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useTagDetails } from "@/hooks/useTagDetails";
import { calculateTotalSize } from "@/utils/tag-details";
import TagDetailsHeader from "@/components/tag-details/TagDetailsHeader";
import TagDetailsBreadcrumb from "@/components/tag-details/TagDetailsBreadcrumb";
import PullCommand from "@/components/tag-details/PullCommand";
import ImageInfoGrid from "@/components/tag-details/ImageInfoGrid";
import ImageConfiguration from "@/components/tag-details/ImageConfiguration";
import LayersTable from "@/components/tag-details/LayersTable";
import BuildHistory from "@/components/tag-details/BuildHistory";

export default function TagDetails() {
  const { repoName, tagName } = useParams<{ repoName: string; tagName: string }>();
  const registryUrl = localStorage.getItem("registryUrl") || "http://localhost:8080";

  const { manifest, config, loading, error } = useTagDetails(repoName, tagName, registryUrl);

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center gap-2 text-slate-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          Loading tag details…
        </div>
      </div>
    );
  }

  if (error || !manifest || !config || !repoName || !tagName) {
    return (
      <div className="p-12 text-center">
        <div className="text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 inline-block">{error || "No data available."}</div>
      </div>
    );
  }

  const totalSize = calculateTotalSize(manifest.layers);

  return (
    <div className="space-y-6">
      <TagDetailsHeader repoName={repoName} tagName={tagName} digest={manifest.config.digest} />

      <TagDetailsBreadcrumb repoName={repoName} tagName={tagName} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Pull Command
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PullCommand registryUrl={registryUrl} repo={repoName} tag={tagName} />
        </CardContent>
      </Card>

      <ImageInfoGrid config={config} totalSize={totalSize} />

      <ImageConfiguration config={config} />

      <LayersTable layers={manifest.layers} />

      <BuildHistory history={config.history} />
    </div>
  );
}
