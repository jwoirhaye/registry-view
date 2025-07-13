import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Layers } from "lucide-react";
import { toast } from "sonner";
import { formatBytes } from "@/utils/tag-details";
import type { LayersTableProps } from "@/types/tag-details";

export default function LayersTable({ layers }: LayersTableProps) {
  const handleCopyDigest = async (digest: string) => {
    try {
      await navigator.clipboard.writeText(digest);
      toast("Copied digest!", { description: digest });
    } catch (error) {
      toast("Failed to copy digest", { description: "Please try again" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Layers ({layers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Digest</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layers.map((layer, index) => (
                <TableRow key={layer.digest} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                      <code className="text-xs break-all text-slate-600 dark:text-slate-400">{layer.digest}</code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{formatBytes(layer.size)}</div>
                    <div className="text-xs text-slate-500">{layer.size.toLocaleString()} bytes</div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => handleCopyDigest(layer.digest)} title="Copy digest">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
