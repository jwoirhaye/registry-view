import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Terminal } from "lucide-react";
import { toast } from "sonner";
import { generatePullCommand, copyToClipboard } from "@/utils/tag-details";
import type { PullCommandProps } from "@/types/tag-details";

export default function PullCommand({ registryUrl, repo, tag }: PullCommandProps) {
  const [copied, setCopied] = useState(false);
  const command = generatePullCommand(registryUrl, repo, tag);

  const handleCopy = async () => {
    try {
      await copyToClipboard(command);
      toast("Copied pull command!", { description: command });
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      toast("Failed to copy command", { description: "Please try again" });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-4 border shadow-sm">
        <Terminal className="w-4 h-4 mr-3 text-slate-500" />
        <span className="flex-1 font-mono text-sm text-slate-700 dark:text-slate-300 select-all">{command}</span>
        <Button
          size="sm"
          variant={copied ? "default" : "outline"}
          onClick={handleCopy}
          className="ml-3 transition-all duration-200"
          title="Copy pull command"
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <span className="text-xs">✓</span>
              Copied
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Copy className="w-3 h-3" />
              Copy
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
