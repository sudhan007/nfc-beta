import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { LeaderCard } from "./LeaderCard";
import { useNavigate } from "@tanstack/react-router";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
function SkeletonLoader() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-center items-center w-[90%] mx-auto">
        <Skeleton className="w-full h-32 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Placeholder for other leaders */}
        <Skeleton className="w-full h-32 rounded-md" />
        <Skeleton className="w-full h-32 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Leadership Team */}
        <Skeleton className="w-full h-32 rounded-md" />
        <Skeleton className="w-full h-32 rounded-md" />
      </div>

      <div className="flex justify-center items-center w-[90%] mx-auto">
        <Skeleton className="w-full h-32 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Membership Committee */}
        <Skeleton className="w-full h-32 rounded-md" />
        <Skeleton className="w-full h-32 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {/* LVH Team */}
        <Skeleton className="w-full h-32 rounded-md" />
        <Skeleton className="w-full h-32 rounded-md" />
      </div>
    </motion.div>
  );
}

export function Leaders() {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [allImages] = useState<string[]>([
    "/img/img.png",
    "/img/test.png",
    "/img/image.png",
    "/img/image.png",
  ]);

  useEffect(() => {
    const imagePromises = allImages.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => setImagesLoaded(true));
  }, [allImages]);

  const { data, isLoading } = useQuery({
    queryKey: ["leaders"],
    queryFn: async () => {
      return await axios.get("/members/getleader");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    
  });
console.log(data)

  if (!imagesLoaded||isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-normal text-[#551212] mx-4">
        Regional Team
      </h1>

      <div className="grid grid-cols-2 gap-4 p-4">
  
      <div  onClick={() => {
        navigate({
          to: "/member/" + data?.data.leaders[0].slug,
        });
      }} 
      className="col-span-2 flex justify-center items-center">
  <LeaderCard
    name={"Mohamed Riaz"}
    position={"Executive Director"}
    image={"/img/members/regional/leader1.png"}
  />
</div>
   
       


        <div className="">
          <LeaderCard
            name={"Mohamed Annez"}
            position={"Support Director"}
            image={"/img/members/regional/leader2.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mohamed Faisal"}
            position={"Support Ambassador"}
            image={"/img/members/regional/leader3.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">
        Leadership Team
      </h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Dr. Nirmal Nellaiappan"}
            position={"President"}
            image={"/img/members/leadership/leader2.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Yosuwa Raja"}
            position={"Vice President"}
            image={"/img/members/leadership/leader1.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Siva Anand Jeyakumar"}
            position={"Secretary/Treasurer"}
            image={"/img/members/leadership/leader3.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">
        Membership Committee
      </h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Mr. Christurajan"}
            position={"Chapter Growth Co-ordinator"}
            image={"/img/members/membership/1.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Rakesh Kumar"}
            position={"Mentor Co-ordinator"}
            image={"/img/members/membership/2.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Benny"}
            position={"Attendance Co-ordinator"}
            image={"/img/members/membership/3.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mrs. Sathya Chellam"}
            position={"Referral Value Co-ordinator"}
            image={"/img/members/membership/4.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Dr. Gracewin"}
            position={"Application Review Co-ordinator"}
            image={"/img/members/membership/5.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">LVH Team</h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Mrs. Arokiya Jessi"}
            position={"Lead Visitor Host"}
            image={"/img/members/lvh/1.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Pandiyan KPM"}
            position={"BIT"}
            image={"/img/members/lvh/2.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Raja Kumaresan"}
            position={"BIT"}
            image={"/img/members/lvh/7.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Thanikachalapandian"}
            position={"FIT"}
            image={"/img/members/lvh/3.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Dr. Fino Jetly"}
            position={"FIT"}
            image={"/img/members/lvh/4.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mrs. Jijiya"}
            position={"LIT"}
            image={"/img/members/lvh/5.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Dr. Sunjanaa Dhepa"}
            position={"LIT"}
            image={"/img/members/lvh/6.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">
        Chapter Coordinators
      </h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Mr. Satheesh Kumar"}
            position={"Education Coordinator"}
            image={"/img/members/coord/1.png"}
            class="w-[172px] h-[195.04px] object-cover"
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr.Rajaram Sri"}
            position={"Feature Presentation Coordinator"}
            image={"/img/members/coord/2.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Biju"}
            position={"Events Coordinator"}
            image={"/img/members/coord/3.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Jude Festus"}
            position={"Connect Coordinator"}
            image={"/img/members/coord/4.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Jebin Stewart"}
            position={"Go Green Coordinator"}
            image={"/img/members/coord/5.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. James"}
            position={"Power Team Coordinator"}
            image={"/img/members/coord/6.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Vimal Davidson"}
            position={"1-2-1 Coordinator"}
            image={"/img/members/coord/7.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Siva Kumar"}
            position={"Time Keeper"}
            image={"/img/members/coord/8.png"}
          />
        </div>
      </div>

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
    </motion.div>
  );
}
