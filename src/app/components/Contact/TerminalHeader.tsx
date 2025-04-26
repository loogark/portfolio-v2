export function TerminalHeader() {
  return (
    <div className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-slate-900 flex items-center gap-1 sm:gap-2 sticky top-0 z-10">
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
      <span className="absolute left-1/2 -translate-x-1/2 text-xs sm:text-sm text-slate-200 font-semibold truncate max-w-[70%]">
        ragoolkrishnan.ram@gmail.com
      </span>
    </div>
  );
}
