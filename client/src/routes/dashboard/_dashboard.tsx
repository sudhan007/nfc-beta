import { Sidebar } from "@/components/shared/Sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard")({
  beforeLoad() {
    const session = sessionStorage.getItem("session");
    if (!session) {
      window.location.href = "/auth/";
    }
  },
  component: () => (
    <div className="flex font-body overflow-hidden h-screen">
      <Sidebar />

      <div className="w-full flex-4 overflow-x-auto bg-black">
        <Outlet />
      </div>
    </div>
  ),
});
