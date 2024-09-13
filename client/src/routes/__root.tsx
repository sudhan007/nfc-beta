import { Icon } from "@iconify/react/dist/iconify.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Toaster
        position="top-right"
        icons={{
          success: (
            <Icon className="text-button text-xl" icon={"ph:check-bold"} />
          ),
          error: (
            <Icon className="text-red-600 text-xl" icon={"ph:warning-bold"} />
          ),
        }}
        theme="light"
        className="text-button font-ct"
      />
    </>
  ),
});
