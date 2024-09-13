import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  const [userData, setUserData] = useState<any>({});
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

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

  const socialKeys = Object.keys(socialIcons);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (member?.data?.member) {
      setUserData(member.data.member);
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
                    tab: "members",
                  },
                })
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
          <h1 className="font-semibold text-[#222222BD] text-sm">
            Our Services
          </h1>

          <div className="flex flex-wrap mt-4 capitalize gap-2">
            {userData?.services?.map((service: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="rounded-full text-[#201658] bg-[#cfcece17] border-[2px] p-2 text-center border-[#C1C1C12E] border-solid flex justify-center items-center"
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
            <p className="text-[#222222BD] font-[400px] text-[13px] leading-[24px] text-justify">
              {userData?.about}
            </p>
          </div>
        </div>

        {/* post images */}
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

        <div className="mt-8 mx-4 mb-10">
          <h1 className="font-medium text-[#222222BD] text-sm">
            Let's Connect
          </h1>

          <div className="grid grid-cols-3 mt-4 mx-4 gap-4">
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
              className="flex flex-col items-center mt-8 cursor-pointer  bg-[#cfcece17] rounded-lg p-4"
              onClick={() => {
                // open phone
              }}
            >
              <img
                src="/img/social/contact.png"
                alt="contact"
                className="mb-1 h-20"
              />
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
