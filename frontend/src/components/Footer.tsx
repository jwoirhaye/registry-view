import { Github, Heart, Code, Palette } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-12 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Registry View
              </span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-sm">&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <a
              href="https://github.com/jwoirhaye/registry-view"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hover:underline">GitHub</span>
            </a>

            <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                Made with
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                using
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">
                  React
                </span>
                <span className="text-slate-400">+</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  shadcn/ui
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <p>A modern Docker registry browser built for developers</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
