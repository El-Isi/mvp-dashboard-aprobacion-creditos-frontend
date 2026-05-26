import type { ToastState } from '@/lib/types';

interface ToastNotificationProps {
  toast: ToastState;
}

export default function ToastNotification({ toast }: ToastNotificationProps) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-lg font-semibold text-[13px] z-[2000] text-white animate-fadeToast shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
        toast.type === 'success' ? 'bg-status-green' : 'bg-status-red'
      }`}
    >
      {toast.msg}
    </div>
  );
}
