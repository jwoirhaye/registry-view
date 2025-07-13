import { GitBranch } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { RepoItem } from "./RepoItem";

interface NamespaceAccordionProps {
  groupedRepos: { [key: string]: string[] };
  onRepoClick: (repo: string) => void;
}

export const NamespaceAccordion = ({ groupedRepos, onRepoClick }: NamespaceAccordionProps) => {
  if (Object.keys(groupedRepos).length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Accordion type="multiple" className="w-full">
        {Object.entries(groupedRepos).map(([namespace, repoList]) => (
          <AccordionItem key={namespace} value={namespace} className="border rounded-lg">
            <AccordionTrigger className="hover:no-underline p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-sm font-medium text-left">{namespace}/</span>
                  <Badge variant="outline" className="text-xs">
                    Namespace
                  </Badge>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {repoList.length} {repoList.length === 1 ? 'image' : 'images'}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="space-y-1 px-4 pb-4">
                {repoList.map((repo) => (
                  <RepoItem
                    key={repo}
                    repo={repo}
                    isNested={true}
                    onClick={onRepoClick}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};