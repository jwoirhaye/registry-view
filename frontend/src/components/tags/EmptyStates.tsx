import { AlertCircle, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading tags..." }: LoadingStateProps) => (
  <div className="text-center py-8">
    <div className="inline-flex items-center gap-2 text-slate-500">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
      {message}
    </div>
  </div>
);

interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="text-center py-8">
    <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
      <AlertCircle className="w-5 h-5" />
      {message}
    </div>
  </div>
);

interface NoResultsStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export const NoResultsState = ({ searchTerm, onClearSearch }: NoResultsStateProps) => (
  <div className="text-center py-8 text-slate-500">
    <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
    <p>No tags found matching "{searchTerm}"</p>
    <Button variant="outline" size="sm" onClick={onClearSearch} className="mt-2">
      Clear search
    </Button>
  </div>
);

export const EmptyRepositoryState = () => (
  <div className="text-center py-8 text-slate-500">
    <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
    <p>No tags found in this repository</p>
  </div>
);

interface SearchResultsFooterProps {
  filteredCount: number;
  totalCount: number;
}

export const SearchResultsFooter = ({ filteredCount, totalCount }: SearchResultsFooterProps) => (
  <div className="mt-4 pt-4 border-t">
    <p className="text-sm text-slate-500 text-center">
      Showing {filteredCount} of {totalCount} tags
    </p>
  </div>
);
