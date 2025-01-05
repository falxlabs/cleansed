import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: false, // Prevent unnecessary refetches on reconnect
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);