import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getHubProgress,
  markChapterComplete,
  markChapterOpened,
  toggleChapterComplete,
  type HubProgress,
  HUB_PROGRESS_EVENT,
} from './progressStore';

type HubUiContextValue = {
  progress: HubProgress;
  markOpened: (slug: string) => void;
  toggleComplete: (slug: string) => boolean;
  markComplete: (slug: string) => void;
};

const HubUiContext = createContext<HubUiContextValue | null>(null);

export function HubUiProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<HubProgress>(() => getHubProgress());

  useEffect(() => {
    const onProgress = () => setProgress(getHubProgress());
    window.addEventListener(HUB_PROGRESS_EVENT, onProgress);
    window.addEventListener('storage', onProgress);
    return () => {
      window.removeEventListener(HUB_PROGRESS_EVENT, onProgress);
      window.removeEventListener('storage', onProgress);
    };
  }, []);

  const markOpened = useCallback((slug: string) => {
    markChapterOpened(slug);
    setProgress(getHubProgress());
  }, []);

  const markComplete = useCallback((slug: string) => {
    markChapterComplete(slug);
    setProgress(getHubProgress());
  }, []);

  const toggleComplete = useCallback((slug: string) => {
    const result = toggleChapterComplete(slug);
    setProgress(getHubProgress());
    return result;
  }, []);

  const value = useMemo(
    () => ({
      progress,
      markOpened,
      toggleComplete,
      markComplete,
    }),
    [progress, markOpened, toggleComplete, markComplete],
  );

  return <HubUiContext.Provider value={value}>{children}</HubUiContext.Provider>;
}

export function useHubUi(): HubUiContextValue {
  const ctx = useContext(HubUiContext);
  if (!ctx) {
    throw new Error('useHubUi must be used within HubUiProvider');
  }
  return ctx;
}
