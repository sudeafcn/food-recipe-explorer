export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden animate-pulse transition-colors duration-300">
      <div className="w-full h-56 bg-slate-200 dark:bg-slate-700"></div>
      <div className="p-5">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3 mb-4"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
      </div>
    </div>
  );
}