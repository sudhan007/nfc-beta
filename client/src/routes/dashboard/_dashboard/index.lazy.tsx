import { useTitle } from "@/hooks/useTitle";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_dashboard/")({
  component: () => <Dashboard />,
});

function Dashboard() {
  useTitle("Dashboard");

  return <div className="flex flex-col w-full overflow-y-auto "></div>;
}
