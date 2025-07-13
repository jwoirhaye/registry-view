export type TagVariant = "default" | "secondary" | "outline";

export const getTagVariant = (tag: string): TagVariant => {
  if (tag === "latest") return "default";
  if (tag.match(/^\d+\.\d+\.\d+$/)) return "secondary";
  if (tag.includes("dev") || tag.includes("beta") || tag.includes("alpha")) return "outline";
  return "secondary";
};

export const getTagLabel = (tag: string): string => {
  if (tag === "latest") return "Latest";
  if (tag.match(/^\d+\.\d+\.\d+$/)) return "Release";
  if (tag.includes("dev") || tag.includes("beta") || tag.includes("alpha")) return "Pre-release";
  return "Tag";
};

export const sortTags = (tags: string[]): string[] => {
  return [...tags].sort((a, b) => {
    // Latest first
    if (a === "latest") return -1;
    if (b === "latest") return 1;

    // Semantic versions
    const aIsVersion = a.match(/^\d+\.\d+\.\d+$/);
    const bIsVersion = b.match(/^\d+\.\d+\.\d+$/);

    if (aIsVersion && bIsVersion) {
      const aParts = a.split(".").map(Number);
      const bParts = b.split(".").map(Number);

      for (let i = 0; i < 3; i++) {
        if (aParts[i] !== bParts[i]) {
          return bParts[i] - aParts[i]; // Descending
        }
      }
    }

    // Alphabetical for others
    return a.localeCompare(b);
  });
};

export const filterTags = (tags: string[], searchTerm: string): string[] => {
  if (searchTerm.trim() === "") return tags;

  return tags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
};
