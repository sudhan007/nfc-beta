import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";

export function Members() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      return await axios.get("/members/getmembers");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Show Skeleton until both data and images are loaded */}
      {!isLoading ? (
        data?.data.members.map((member: any, index: number) => {
          return (
            <div
              onClick={() => {
                navigate({
                  to: "/member/" + member.slug,
                });
              }}
              key={index}
              className="flex mx-auto w-[95%] gap-4 p-2 rounded-xl bg-[#cfcece17] border-[2px] text-start border-[#C1C1C12E] border-solid capitalize"
            >
              <img
                alt="User Image"
                className={`w-[85px] h-[85px] rounded-full object-cover border-4 border-white border-solid object-[0px_1px]`}
                src={member.userImage}
              />

              <div className="px-[1px]">
                <h1 className="text-lg font-medium md:text-lg lg:text-2xl truncate">
                  {member.username}
                </h1>
                <h2 className="text-sm font-medium text-gray-500 capitalize md:text-base lg:text-lg">
                  {member.position}
                </h2>
                <h3 className="text-[#551212] capitalize text-sm md:text-base lg:text-lg">
                  {member.companyName}
                </h3>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex mx-auto w-[90%] gap-4 p-2">
              <Skeleton className="w-[70px] h-[70px] rounded-full" />
              <div className="px-2 flex flex-col gap-2">
                <Skeleton className="w-[300px] h-[20px] rounded-full" />
                <Skeleton className="w-[80px] h-[15px] rounded-full" />
                <Skeleton className="w-[120px] h-[15px] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="flex justify-center items-center p-4 cursor-pointer"
        onClick={() => {
          let phone = "9677362634";

          window.open(`https://api.whatsapp.com/send?phone=${phone}`, "_blank");
        }}
      >
       <p className="text-sm text-[#4E4E4E9C]">Powered by <span className="text-[#4e4e4eca]"> Wenoxo Technologies</span></p>
        {/* <img src="/img/logo.png" className="h-4" /> */}
      </div>
    </div>
  );
}
