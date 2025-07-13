import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Folder, FileText } from "lucide-react";

type RepoTree = {
  [key: string]: null | RepoTree;
};

export function RepoAccordion({
  tree,
  basePath = "",
  onClickRepo,
  level = 0,
}: {
  tree: RepoTree;
  basePath?: string;
  onClickRepo: (repo: string) => void;
  level?: number;
}) {
  const entries = Object.entries(tree);
  const leaves = entries.filter(([, value]) => value === null);
  const folders = entries.filter(([, value]) => value !== null);

  return (
    <div>
      {leaves.map(([key]) => (
        <div
          key={key}
          className="flex items-center gap-2 p-3 pl-4 cursor-pointer hover:bg-blue-50 rounded transition font-mono"
          style={{ marginLeft: level ? 16 : 0 }}
          onClick={() => onClickRepo(basePath ? basePath + "/" + key : key)}
        >
          <FileText size={16} />
          {key}
        </div>
      ))}
      <Accordion type="multiple" className="w-full">
        {folders.map(([key, value]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>
              <span className="inline-flex items-center gap-2 font-semibold">
                <Folder size={16} />
                {key}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-2">
              <RepoAccordion
                tree={value as RepoTree}
                basePath={basePath ? basePath + "/" + key : key}
                onClickRepo={onClickRepo}
                level={level + 1}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
