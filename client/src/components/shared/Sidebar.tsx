import { useTitle } from "@/hooks/useTitle";
import { Icon } from "@iconify/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export function Sidebar() {
  useTitle("Dashboard | Add Members");

  let navigate = useNavigate();
  let route = useRouter();
  let [activeroute, setActiveroute] = useState(route.state.location.pathname);

  let routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "ic:outline-dashboard",
      subRoutes: "-",
    },
    {
      name: "Members",
      href: "/dashboard/list",
      icon: "fa6-solid:user-tie",
      subRoutes: "-",
    },
    {
      name: "Add Member",
      href: "/dashboard/members",
      icon: "mingcute:user-add-line",
      subRoutes: "-",
    },
  ];

  return (
    <>
      <div className="hidden w-[300px] border-r border-r-gray-700 md:block h-[calc(100vh)] bg-black">
        <div className="flex flex-col justify-between h-full gap-2">
          <div className="flex-1 mt-10">
            <nav className="flex flex-col items-start text-sm px-4">
              {routes.map((route) => (
                <div key={route.name} className="w-full">
                  <button
                    className="w-full py-1"
                    onClick={() => {
                      setActiveroute(route.href);
                      navigate({
                        to: `${route.href}`,
                      });
                    }}
                  >
                    <div
                      className={`flex cursor-pointer items-center font-bold font-body ${
                        activeroute === route.href
                          ? "text-white bg-slate-600"
                          : "text-white"
                      } justify-start rounded-md p-2`}
                    >
                      <Icon icon={route.icon} className="mr-2 h-6 w-6" />
                      <p className="text-md flex items-center gap-3 rounded-lg px-3 py-2 font-normal transition-all">
                        {route.name}
                      </p>
                    </div>
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
