import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import leadership from "@/components/assets/leadership.png"
import hug from "@/components/assets/hug.png"
import heart from "@/components/assets/heart 1.png"
import happiness from "@/components/assets/happiness 1.png"
import faith from "@/components/assets/faith.png"
import BNI from "@/components/assets/BNI.png"
import action_coach from "@/components/assets/action_coach.png"
import janseva from "@/components/assets/janseva.png"
import Time from "@/components/assets/Time.png"
import Arasan from "@/components/assets/Arasan.png"
import Halwa_King from "@/components/assets/Halwa_King.png"
import Kings_Chic from "@/components/assets/Kings_Chic.png"
import ABCD from "@/components/assets/ABCD.png"
import Vison from "@/components/assets/vison.png"
import Mission from "@/components/assets/Mission.png"
export const Route = createLazyFileRoute("/member/$id")({
  component: () => <Member />,
  pendingComponent: () => <SkeletonLoader />,
});

const SkeletonLoader = () => (
  <div className="bg-white w-full max-w-[430px] mx-auto p-4">
    {/* Header Skeleton */}
    <div className="relative">
      <Skeleton className="w-full h-[175px] rounded-md" />
    </div>

    {/* Personal Info Skeleton */}
    <div className="mt-12 mx-4">
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-2" />
      <Skeleton className="w-1/2 h-4" />
    </div>

    {/* Services Skeleton */}
    <div className="mt-3 mx-4">
      <Skeleton className="w-1/2 h-6 mb-4" />
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="w-full h-12 rounded-full" />
        <Skeleton className="w-full h-12 rounded-full" />

        <Skeleton className="w-full h-12 rounded-full" />
        <Skeleton className="w-full h-12 rounded-full" />
      </div>
    </div>

    {/* About Skeleton */}
    <div className="mt-6 mx-4">
      <Skeleton className="w-1/2 h-6 mb-4" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-full h-4" />
    </div>

    {/* Pictures Skeleton */}
    <div className="mt-6 mx-4 grid grid-cols-2 gap-4">
      <Skeleton className="w-full h-full rounded-lg" />
      <Skeleton className="w-full h-full rounded-lg" />
    </div>

    {/* Connect Skeleton */}
    <div className="mt-8 mx-4">
      <Skeleton className="w-1/2 h-6 mb-4" />
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-16 h-16 rounded-full" />

        <Skeleton className="w-16 h-16 rounded-full" />
      </div>
    </div>
  </div>
);

function Member() {
  const { id }: any = Route.useParams();

  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false)
  const { data: member, isLoading: dataLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      return axios.get(`/members/getmember?slug=${id}`);
    },
  });

  const socialIcons: any = {
    instagram: { icon: "/img/social/instagram.png", label: "Instagram" },
    linkedin: { icon: "/img/social/linkedin.png", label: "LinkedIn" },
    facebook: { icon: "/img/social/facebook.png", label: "Facebook" },
    twitter: { icon: "/img/social/twitter.png", label: "Twitter" },
    youtube: { icon: "/img/social/youtube.png", label: "YouTube" },
    mail: { icon: "/img/social/mail.png", label: "Mail" },
    website: { icon: "/img/social/website.png", label: "Website" },
    whatsapp: { icon: "/img/social/whatsapp.png", label: "WhatsApp" },
  };

  const currentPositions: Array<{ img: any; alt: string, position: string; location: string; website: string }> = [
    {
      img: `${BNI}`,
      alt: "BNI",
      position: "Executive Director",
      location: "@BNI tirunelveli",
      website: "www.bni-tirunelveli.in",
    },
    {
      img: `${BNI}`,
      alt: "BNI",
      position: "Executive Director",
      location: "@BNI nagercoil & tuticorin",
      website: "www.bni-nagercoiltirunelveli.in",
    },
    {
      img: `${action_coach}`,
      alt: "ActionCOACH",
      position: "ActionCOACH",
      location: "@Buisness coach",
      website: "www.actioncoach.com",
    },
    {
      img: `${janseva}`,
      alt: "Janseva",
      position: "DeputyManagingDirector (HR&Marketing)",
      location: "@JansevaCooperative CreditSociety,India",
      website: "www.janseva.in",
    },
    {
      img: `${Time}`,
      alt: "Time school",
      position: "Correspondent",
      location: "@Time school",
      website: "www.timeschool.org",
    },
    {
      img: `${Arasan}`,
      alt: "Arasan",
      position: "Managing Partner",
      location: "@Arasan Supermarket",
      website: "www.thekingsgroup.in",
    },
    {
      img: `${Halwa_King}`,
      alt: "King’s Retail",
      position: "Managing Partner",
      location: "@King’s Retail Ventures",
      website: "www.halwaking.com",
    },
    {
      img: `${Kings_Chic}`,
      alt: "King’s chic",
      position: "Managing Partner",
      location: "@King’s chic",
      website: "www.kingschic.in",
    },
    {
      img: `${ABCD}`,
      alt: "Arasan",
      position: "Managing Partner",
      location: "@Arasan building & construction development",
      website: "www.arasanconstruction.com",
    },

  ];
  const previousPositions: Array<{ img: string; alt: string, position: string; location: string; Duration: string }> = [
    {
      img: `${Arasan}`,
      alt: "arasan",
      position: "Managing Director",
      location: "@Arasan bakery & Restaurant Co.,(P) Ltd ",
      Duration: "Since 1997 - 2013",
    },
    {
      img: `${Arasan}`,
      alt: "arasan",
      position: "Managing Director",
      location: "@Arasan beedi company Private Limited ",
      Duration: "Since 1997 - 2012",
    },
    {
      img: `${Arasan}`,
      alt: "arasan",
      position: "Director",
      location: "@Arasan sweets & milk food (P) Ltd",
      Duration: "Since 2005 - 2013",
    },
    {
      img: `${Arasan}`,
      alt: "arasan",
      position: "Director",
      location: "@Arasan dipartmental store (P) Ltd",
      Duration: "Since 2009 - 2013",
    },
    {
      img: `${Arasan}`,
      alt: "arasan",
      position: "Director",
      location: "@Arasan Fashion  Design  (P) Ltd",
      Duration: "Since 2005 - 2012",
    },
    {
      img: `${Arasan}`,
      alt: "arasan",
      position: "Managing Partner",
      location: "@Arasan Tailors",
      Duration: "Since 1997 - 2011",
    },
  ]

  const displayedPositions = showAll ? previousPositions : previousPositions.slice(0, 3);

  const socialKeys = Object.keys(socialIcons);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (member?.data?.member) {
      setUserData(member.data.member);
      if (member.data.member.key === "leader") {
        setIsLeader(true);
      }
      setDataLoaded(true);
    }

    if (dataLoaded && userData?.pictures) {
      const imagePromises = userData.pictures.map((picture: string) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = picture;
          img.onload = resolve;
        });
      });

      Promise.all(imagePromises).then(() => setImagesLoaded(true));
    } else if (dataLoaded) {
      setImagesLoaded(true);
    }
  }, [dataLoaded, userData, dataLoading]);

  if (dataLoading || !dataLoaded || !imagesLoaded) {
    return <SkeletonLoader />;
  }

  return (
    <motion.main className="min-h-screen flex flex-col items-center bg-black">
      <div
        className="bg-white w-full max-w-[430px] mx-auto"
        style={{
          minHeight: "100vh",
        }}
      >
        {/* header */}
        <div className="relative flex flex-col items-center justify-center">
          <img
            src={userData?.bannerImage}
            alt="placeholder"
            className="w-full h-[175px] object-cover"
          />

          <div className="absolute top-4 left-4 cursor-pointer h-10 w-10 shadow-lg rounded-full border-[2px] border-[#C1C1C12E] border-solid">
            <img
              src="/img/back.png"
              alt="back"
              className=""
              onClick={() =>
                navigate({
                  to: "/bnicomorin",
                  search: {
                    tab: isLeader ? "leaders" : "members",
                  },
                }

                )
              }
            />
          </div>

          <img
            src={userData?.userImage}
            alt="image"
            className="w-24 h-24 rounded-full absolute top-[120px] left-[20px] border-4 border-white object-cover"
          />
        </div>

        {/* personal info */}
        <div className="mt-12 mx-4">
          <div className="flex items-center gap-2 justify-between">
            <h1 className="font-bold text-black text-xl">
              {userData?.username}
            </h1>

            <img
              src="/img/share.png"
              alt="share"
              className="w-10 h-10 cursor-pointer"
              onClick={() => {
                let url = window.location.href;
                navigator.clipboard.writeText(url);

                // whatsapp
                window.open(
                  "https://api.whatsapp.com/send?text=" +
                  encodeURIComponent(url),
                  "_blank"
                );
              }}
            />
          </div>
          <h3 className="text-[#222222BD] font-regular text-sm ">
            <span className="text-black cursor-pointer capitalize">
              {userData?.position}
            </span>
          </h3>
          {/* <h3 className="font-regular text-black text-sm pt-1 font-semibold">
            {userData?.position}
          </h3> */}
          {/* {userData && userData.companyWebsite && (
            <h3 className="text-[#222222] font-regular text-sm pt-2">
              Company Website -{" "}
              <span
                className="text-[#0064E1] cursor-pointer"
                onClick={() => window.open(userData?.companyWebsite, "_blank")}
              >
                {userData?.companyWebsite}
              </span>
            </h3>
          )} */}
          <h3 className="text-[#222222] font-regular text-sm pt-2">
            <span className="text-[#0064E1] cursor-pointer capitalize">
              {userData?.companyName}
            </span>
          </h3>
        </div>

        {/* our services */}
        <div className="mt-3 mx-4">
          {
            isLeader ? <></> : <h1 className="font-semibold text-[#222222BD] text-sm">
              Our Services
            </h1>
          }
          <div className="flex flex-wrap mt-4 capitalize gap-2">
            {userData?.services?.map((service: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                style={{ boxShadow: '0px 0px 2px 0px #00000040' }}
                className="rounded-full font-normal text-[11px] text-[#201658] bg-[#cfcece17] border-none  p-2 text-center border-[#C1C1C12E]  flex justify-center items-center"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>



        {/* about */}
        <div className="mt-6 mx-4">
          <h1 className="font-semibold text-[#222222BD] text-sm">
            👋 Hi, About Myself
          </h1>

          <div className="mt-4">
            {
              isLeader ?
                <p className="text-[#222222BD] font-[400px] text-[13px] leading-[24px]  flex flex-col gap-[11px] text-justify ">
                  <span>
                    I am Mohamed Riaz, an Executive Director, ActionCOACH Business Coach, and serial entrepreneur with over two decades of leadership experience. Throughout my career, I have successfully led multiple ventures, managing businesses across industries such as retail, hospitality, and construction.
                  </span>
                  <span>My roles as Executive Director at BNI Tirunelveli, Nagercoil, and Tuticorin, along with my strategic leadership at King's Retail Ventures and Arasan Supermarket, highlight my commitment to fostering business growth and community engagement.</span>
                  <span>
                    My passion for business coaching has led me to help entrepreneurs maximize their potential through actionable strategies that drive growth and productivity.
                  </span>
                </p>
                :
                <p className="text-[#222222BD] font-[400px] text-[13px] leading-[24px] text-justify">
                  {userData?.about}
                </p>
            }

          </div>
        </div>
        {
          isLeader ? <>
            <div className="mx-[14px]">
              {/* quotes */}
              <div
                className="text-transparent bg-clip-text mt-4"
                style={{
                  backgroundImage: 'linear-gradient(270deg, #0064E1 66.67%, #26B7FF 126.47%)',
                }}
              >
                <p >
                  <span className="text-[15px] font-bold ">
                    “
                  </span>
                  <span className="text-[13px]">
                    To educate, encourage & empower every young startup entrepreneur in india to achieve more
                  </span>
                  <span className="text-[15px] font-bold ">
                    ”
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <div className="grid grid-cols-3 gap-[12px]">
                  <div className="flex gap-[9px] items-center">
                    <img className="w-[18px] h-[18px]" src={leadership} alt="leadership" />
                    <p className="text-[#373737BD] text-[13px]">Leadership</p>
                  </div>
                  <div className="flex gap-[9px] items-center">
                    <img className="w-[18px] h-[18px]" src={hug} alt="compassion" />
                    <p className="text-[#373737BD] text-[13px]">Compassion</p>
                  </div>
                  <div className="flex gap-[9px] items-center">
                    <img className="w-[18px] h-[18px] " src={happiness} alt="Optimism" />
                    <p className="text-[#373737BD] text-[13px]">Optimism</p>
                  </div>
                  <div className="flex gap-[9px] items-center">
                    <img className="w-[18px] h-[18px]" src={heart} alt="honesty" />
                    <p className="text-[#373737BD] text-[13px]">Honesty</p>
                  </div>
                  <div className="flex gap-[9px] items-center">
                    <img className="w-[18px] h-[18px]" src={faith} alt="Faith" />
                    <p className="text-[#373737BD] text-[13px]">Faith</p>
                  </div>
                </div>
              </div>
              {/* vision and mission */}
              <div className="flex -mx-[3px] flex-col gap-[14px]  mt-[22px]">
                <div className="border rounded-[9px] p-[12px]">
                  <div className="flex gap-[8px]">
                    <img src={Vison} alt="" className="h-[20px] w-[20px]" />
                    <p className="text-[14px]">Vison</p>
                  </div>
                  <p className="text-[13px] mt-[11px] text-[#222222BD]">
                    To help 1,00,000 young entrepreneurs create a process, be productive & build wealth by 2030
                  </p>
                </div>
                <div className="border rounded-[9px] p-[12px]">
                  <div className="flex gap-[8px]">
                    <img src={Mission} alt="" className="h-[20px] w-[24px]" />
                    <p className="text-[14px]">Mission</p>
                  </div>
                  <p className="text-[13px] mt-[11px] text-[#222222BD]">
                    To educate, encourage & empower every young startup entrepreneur in india to achieve more.</p>
                </div>
              </div>
              {/* current position */}
              <div className="mt-[22px]">
  <p className="text-[#222222BD]">Current Positions</p>
  <div    style={{ boxShadow: '0px 0px 2px 0px #00000040' }} className="mt-6 rounded-xl px-1">
    {currentPositions.map((member, index) => (
      <div
        key={index}
        className={`py-4 gap-[10px] flex ${index === currentPositions.length - 1 ? '' : 'border-b'}`}
      >
        <div>
          <img
            src={member.img}
            alt={member.alt}
            className="w-[40px] ml-[11px] text-xs h-[40px] object-cover rounded-md"
          />
        </div>
        <div>
          <h2 className="text-[14px] text-[#222222ED]">{member.position}</h2>
          <p className="text-blue-500 text-[13px]">{member.location}</p>
          <p className="text-[12px] text-[#222222BD]">{member.website}</p>
        </div>
      </div>
    ))}
  </div>
</div>


              {/* previous position */}
              <div className="mt-4">
  <div className="flex justify-between items-center">
    <p className="text-[#222222BD]">Previous Positions</p>
    <p
      className="text-[#0064E1] cursor-pointer"
      onClick={() => setShowAll(!showAll)}
    >
      {showAll ? "View Less" : "View All"}
    </p>
  </div>

  <div className="mt-6 rounded-xl px-1 "   style={{ boxShadow: '0px 0px 2px 0px #00000040' }}>
    {displayedPositions.map((member, index) => (
      <div
        key={index}
        className={`py-4 flex ${index === displayedPositions.length - 1 ? '' : 'border-b'}`}
      >
        <div>
          <img
            src={member.img}
            alt={member.alt}
            className="text-xs ml-[11px] h-[40px] w-[40px] object-cover rounded-md mb-4"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-[14px] text-[#222222ED]">{member.position}</h2>
          <p className="text-blue-500 text-[13px]">{member.location}</p>
          <p className="text-[12px] text-[#222222BD]">{member.Duration}</p>
        </div>
      </div>
    ))}
  </div>
</div>


            </div>
          </> :
            <>
              {userData && userData?.pictures?.length > 0 && (
                <div className="grid grid-cols-2 mt-6 mx-4 gap-4">
                  {userData?.pictures?.map((picture: string, index: number) => (
                    <img
                      src={picture}
                      alt="image"
                      className="w-full h-[160px] rounded-lg object-cover"
                      key={index}
                    />
                  ))}
                </div>
              )}
            </>
        }


        <div className="mt-[22px] mx-[16px] mb-10 ">
          <h1 className="font-medium text-[#222222BD] text-sm">
            Let's Connect
          </h1>

          <div className="grid grid-cols-3 mt-[22px]  gap-4 pb-[100px]">
            {socialKeys.map((key) =>
              userData[key] ? (
                <div
                  key={key}
                  className="flex flex-col items-center cursor-pointer p-2 bg-[#c7c5c517] rounded-lg"
                  onClick={() =>
                    window.open(
                      key === "mail"
                        ? `mailto:${userData[key]}`
                        : key === "whatsapp"
                          ? `https://wa.me/${userData[key]}`
                          : userData[key],
                      "_blank"
                    )
                  }
                >
                  <img
                    src={socialIcons[key].icon}
                    alt={socialIcons[key].label}
                    className="w-14 h-14 mb-2 object-cover"
                  />
                  <span className="text-sm font-medium">
                    {socialIcons[key].label}
                  </span>
                </div>
              ) : null
            )}
          </div>
          {userData?.phone && (
            <div
              className="mt-8 fixed bottom-0 left-0 right-0"
              onClick={() => {
                window.location.href = `tel:${userData.phone}`;
              }}
            >
              <div className="flex w-full justify-center items-center">
                <div className="bg-[#0064E1] h-16 w-[269px] m-8 rounded-full flex items-center justify-center gap-2">
                  <img src="/img/call.png" alt="call" className="w-7 h-7" />
                  <h2 className="text-white font-bold">Contact Me</h2>
                </div>
              </div>


            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
