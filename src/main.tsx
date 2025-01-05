import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import * as serviceWorker from './utils/serviceWorker'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: false, // Prevent unnecessary refetches on reconnect
      throwOnError: true, // Let error boundary handle errors
    },
  },
})

// Prefetch initial data
const prefetchInitialData = async () => {
  try {
    // Prefetch journal entries for today
    await queryClient.prefetchQuery({
      queryKey: ['journal-entries', new Date().toISOString()],
      queryFn: () => fetch('/api/journal-entries').then(res => res.json()),
    })

    // Prefetch daily verse
    await queryClient.prefetchQuery({
      queryKey: ['dailyVerse'],
      queryFn: () => fetch('/api/daily-verse').then(res => res.json()),
    })
  } catch (error) {
    console.error('Error prefetching initial data:', error)
  }
}

// Start prefetching as soon as possible
prefetchInitialData()

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Register service worker for offline support
serviceWorker.register();