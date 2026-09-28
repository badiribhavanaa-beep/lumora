import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isInfo = toast.type === 'info';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-4 bg-stone-900/95 dark:bg-stone-100/95 backdrop-blur-md text-white dark:text-stone-900 shadow-xl rounded-xl border border-white/10 dark:border-stone-800/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />}
              {isInfo && <Info className="w-4 h-4 text-sky-400 dark:text-sky-600 shrink-0" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400 dark:text-rose-600 shrink-0" />}
              <span className="text-xs font-medium tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-3 p-1 text-stone-400 hover:text-white dark:hover:text-stone-950 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
