import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Folder } from "lucide-react";
import type { ImageConfig } from "@/types/registry";

interface ImageConfigurationProps {
  config: ImageConfig;
}

export default function ImageConfiguration({ config }: ImageConfigurationProps) {
  const { config: imageConfig } = config;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Image Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Command</div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <code className="text-sm">{imageConfig?.Cmd?.join(" ") || "—"}</code>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Working Directory</div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <code className="text-sm flex items-center gap-2">
                <Folder className="w-4 h-4" />
                {imageConfig?.WorkingDir || "—"}
              </code>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Exposed Ports</div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <div className="text-sm">
                {imageConfig?.ExposedPorts
                  ? Object.keys(imageConfig.ExposedPorts).map((port) => (
                      <Badge key={port} variant="outline" className="mr-1 mb-1">
                        {port}
                      </Badge>
                    ))
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        {imageConfig?.Env && imageConfig.Env.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Environment Variables</div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 max-h-40 overflow-auto">
              <div className="space-y-1">
                {imageConfig.Env.map((env, index) => (
                  <div key={index} className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    {env}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
