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
            name={"Mr. Jude Festus"}
            position={"President"}
            image={"/img/members/leadership/jude.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Vimal Davidson"}
            position={"Vice President"}
            image={"/img/members/leadership/vimal.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mrs. Arockia Jesi"}
            position={"Secretary/Treasurer"}
            image={"/img/members/leadership/arockiyajesi.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">
        Membership Committee
      </h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Mr. Palayen Christurajan"}
            position={"Chapter Growth Co-ordinator"}
            image={"/img/members/membership/1.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Satheesh Kumar"}
            position={"Mentor Co-ordinator"}
            image={"/img/members/membership/white.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Vijay Ganesh"}
            position={"Attendance Co-ordinator"}
            image={"/img/members/membership/vijay.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Dr. Gracewin Jacob"}
            position={"Referral Value Co-ordinator"}
            image={"/img/members/membership/gracewinjacob.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Raja Ram"}
            position={"Application Review Co-ordinator"}
            image={"/img/members/membership/rajaram.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">LVH Team</h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Mrs. Sathya Chellam"}
            position={"Lead Visitor Host"}
            image={"/img/members/lvh/sathya.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Jayasuthan P"}
            position={"BIT"}
            image={"/img/members/lvh/white.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mrs. Geerthana"}
            position={"BIT"}
            image={"/img/members/lvh/white.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mrs. Felcie Ponmathi"}
            position={"FIT"}
            image={"/img/members/lvh/felcie .png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Benny S"}
            position={"FIT"}
            image={"/img/members/lvh/benny.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Thanikasala Pandian"}
            position={"LIT"}
            image={"/img/members/lvh/pandian.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Sahaya Antony Suresh"}
            position={"LIT"}
            image={"/img/members/lvh/suresh.png"}
          />
        </div>
      </div>

      <h1 className="text-2xl font-normal text-[#551212] mx-4">
        Chapter Coordinators
      </h1>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="">
          <LeaderCard
            name={"Mr. Jasim M"}
            position={"Education Coordinator"}
            image={"/img/members/coord/jasim.png"}
            class="w-[172px] h-[195.04px] object-cover"
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. James"}
            position={"Feature Presentation Coordinator"}
            image={"/img/members/coord/james.png"}
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
            name={"Mr. Yosuwa Raja"}
            position={"Connect Coordinator"}
            image={"/img/members/coord/yosuwa.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Dr. Fino Jetly"}
            position={"Go Green Coordinator"}
            image={"/img/members/coord/jetly.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Pandian"}
            position={"Power Team Coordinator"}
            image={"/img/members/coord/pandian-bp.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mrs. Jijiya"}
            position={"1-2-1 Coordinator"}
            image={"/img/members/coord/JIJIYA.png"}
          />
        </div>

        <div className="">
          <LeaderCard
            name={"Mr. Maria Britto"}
            position={"Time Keeper"}
            image={"/img/members/coord/britto.png"}
          />
        </div>
        <div className="">
          <LeaderCard
            name={"Mr. Suresh Ramachandran"}
            position={"Business Coordinator"}
            image={"/img/members/coord/ramachandran.png"}
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
