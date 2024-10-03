import { Leaders } from "@/components/shared/Leaders";
import { Members } from "@/components/shared/Members";
import {
  createLazyFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createLazyFileRoute("/bnicomorin")({
  component: () => <Index />,
});

function Index() {
  let { search } = useLocation();
  let _search: any = search;

  const [activeTab, setActiveTab] = useState(_search["tab"] || "leaders");
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    navigate({
      to: "?tab=" + tab,
    });
    window.scrollTo(0, 0);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black">
      <div
        className="bg-white w-full max-w-[430px] mx-auto"
        style={{
          minHeight: "100vh",
        }}
      >
        <div>
          <div
            className="text-white text-center h-[175px] relative"
            style={{
              background: "url(/img/grouppic.png)",
              backgroundSize: "cover",
            }}
          >
            <img
              src="/img/bni.svg"
              className="absolute top-[100px] left-0 h-36 w-auto"
              alt="BNI Logo"
            />
          </div>

          <div className="flex gap-[1rem] p-2 sm:p-4 justify-end">
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">47</h2>
              <h4 className="text-[#000000B0] font-normal text-sm sm:text-base md:text-lg">
                Members
              </h4>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
                3914
              </h2>
              <h4 className="text-[#000000B0] font-normal text-sm sm:text-base md:text-lg">
                Referrals
              </h4>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">13+</h2>
              <h4 className="text-[#000000B0] font-normal text-sm sm:text-base md:text-lg">
                Crores business
              </h4>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-40 bg-white mt-4">
          <div className="bg-[#A7A7A724] w-[95%] mx-auto flex rounded-md p-2 relative">
            <motion.div
              className="absolute top-2 bottom-2 left-2 right-2 bg-white rounded-md"
              layout
              transition={{ type: "spring", duration: 0.3 }}
              initial={false}
              animate={{
                x: activeTab === "leaders" ? "0%" : "90%",
                width: "50%",
              }}
            />
            <button
              className={`p-2 sm:p-4 w-full text-lg sm:text-xl relative z-10 ${
                activeTab === "leaders"
                  ? "text-[#E30000] font-[500]"
                  : "text-black"
              }`}
              onClick={() => handleTabClick("leaders")}
            >
              Leaders
            </button>
            <button
              className={`p-2 sm:p-4 w-full text-lg sm:text-xl relative z-10 ${
                activeTab === "members"
                  ? "text-[#E30000] font-[500]"
                  : "text-black"
              }`}
              onClick={() => handleTabClick("members")}
            >
              Members
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4 overflow-y-auto pb-5">
          {activeTab === "leaders" && <Leaders />}
          {activeTab === "members" && <Members />}
        </div>
      </div>
    </div>
  );
}
