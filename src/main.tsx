import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: false, // Prevent unnecessary refetches on reconnect
      useErrorBoundary: true, // Use error boundary for query errors
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);