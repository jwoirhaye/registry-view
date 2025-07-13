import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Code, Server, User } from "lucide-react";

export default function Navbar({ onLogout, onHomeClick }: { onLogout: () => void; onHomeClick: () => void }) {
  const username = localStorage.getItem("username") || "Anonymous";
  const registryUrl = localStorage.getItem("registryUrl") || "localhost:8080";
  const displayUrl = registryUrl.replace(/^https?:\/\//, "").replace(/:\d+$/, "");

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHomeClick}>
          <div className="p-2 bg-slate-900 dark:bg-white rounded-lg">
            <Code className="w-5 h-5 text-white dark:text-slate-900" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-slate-900 dark:text-white">Registry View</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1">Docker Registry Browser</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 ml-4">
          <Badge variant="outline" className="flex items-center gap-1 text-xs border-slate-300 dark:border-slate-600">
            <Server className="w-3 h-3" />
            {displayUrl}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-32 truncate">{username}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </nav>
  );
}
