import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History } from "lucide-react";
import type { BuildHistoryProps } from "@/types/tag-details";

interface HistoryStep {
  created_by: string;
  created?: string;
}

export default function BuildHistory({ history }: BuildHistoryProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  const hasHistory = Array.isArray(history) && history.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Build History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Step</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasHistory ? (
                history.map((step: HistoryStep, index: number) => (
                  <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded p-2">
                        <code className="text-xs">{step.created_by}</code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(step.created)}</div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-slate-400 py-8">
                    No build history available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
