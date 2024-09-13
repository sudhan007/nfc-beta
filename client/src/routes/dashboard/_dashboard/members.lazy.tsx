"use client";

import { FileUploaderComponent } from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagsInput } from "@/components/ui/tagsinput";
import { Textarea } from "@/components/ui/textarea";
import { axios } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  username: z.string().optional(),
  position: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  companyName: z.string(),
  companyWebsite: z.string().optional(),
  services: z.array(z.string()).min(1),
  about: z.string().optional(),
  slug: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  mail: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().optional(),
});

export const Route = createLazyFileRoute("/dashboard/_dashboard/members")({
  component: () => <Members />,
});

function Members() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
      position: "",
      email: "",
      phone: "",
      companyName: "",
      companyWebsite: "",

      services: [""],
      about: "",
      slug: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      youtube: "",
      mail: "",
      whatsapp: "",
      website: "",
    },
  });

  const [profileImage, setProfileImage] = useState<File[] | null>(null);
  const [bannerImage, setBannerImage] = useState<File[] | null>(null);
  const [postImages, setPostImages] = useState<File[]>([]);

  // storing services
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    setValue(
      "slug",
      slugify(watch("companyName"), {
        lower: true,
        replacement: "-",
      })
    );
  }, [watch("companyName")]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return axios.post("/members/addmember", data);
    },
    onSuccess: (data) => {
      toast.success(
        (data.data["msg"] as string) || "Member added successfully"
      );

      if (data.data["msg"] === "User created successfully") {
        reset();
        setPostImages([]);
        setProfileImage(null);
        setBannerImage(null);
        setServices([]);
      }
    },
    onError: (err) => {
      toast.error("Error adding member");
      console.error(err);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    console.log(services, profileImage, bannerImage, postImages);
    if (services.length < 0) {
      toast.error("Please add atleast one service");
      return;
    }

    if (!profileImage) {
      toast.error("Please add profile image");
      return;
    }

    if (!bannerImage) {
      toast.error("Please add banner image");
      return;
    }

    const formData: any = new FormData();
    formData.append("username", data.username);
    formData.append("position", data.position);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("companyName", data.companyName);
    formData.append("companyWebsite", data.companyWebsite);
    formData.append("services", JSON.stringify(services));
    formData.append("about", data.about);
    formData.append("slug", data.slug);
    formData.append("instagram", data.instagram);
    formData.append("linkedin", data.linkedin);
    formData.append("facebook", data.facebook);
    formData.append("twitter", data.twitter);
    formData.append("youtube", data.youtube);
    formData.append("whatsapp", data.whatsapp);
    formData.append("mail", data.mail);
    formData.append("website", data.website);
    formData.append("userImage", profileImage[0]);
    formData.append("bannerImage", bannerImage[0]);
    for (let i = 0; i < postImages.length; i++) {
      formData.append(`pictures`, postImages[i]);
    }

    mutate(formData);
  };

  return (
    <main className="flex  flex-col gap-4 p-4 lg:gap-6 lg:p-2 text-gray-300 text-lg overflow-y-hidden">
      <div className="flex sticky top-0">
        <div className="flex items-center mx-8">
          <h1 className="text-lg font-semibold md:text-2xl">Add Members</h1>
        </div>
      </div>

      <section className="mx-8 max-w-[80%]">
        <form
          className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:gap-6 lg:p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full col-span-2 bg-gray-900 rounded-md text-xs p-2 font-bold text-white">
            <h3>Personal</h3>
          </div>
          {/* Username */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="block text-sm font-medium">
              Username
            </Label>
            <Input
              placeholder="Ex: Tony Stark"
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Position */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="position" className="block text-sm font-medium">
              Category
            </Label>
            <Input
              placeholder="Ex: CEO, CTO"
              type="text"
              id="position"
              {...register("position", { required: "Position is required" })}
            />
            {errors.position && (
              <p className="text-sm text-red-500">{errors.position.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="block text-sm font-medium">
              Email
            </Label>
            <Input
              placeholder="Ex: tony@stark.com"
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </Label>
            <Input
              placeholder="Ex: +1 123 456 7890"
              type="tel"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="companyName" className="block text-sm font-medium">
              Company Name
            </Label>
            <Input
              placeholder="Ex: Stark Industries"
              type="text"
              id="companyName"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Company Website */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="companyWebsite"
              className="block text-sm font-medium"
            >
              Company Website
            </Label>
            <Input
              placeholder="Ex: www.starkindustries.com"
              type="url"
              id="companyWebsite"
              {...register("companyWebsite", {
                required: "Website is required",
              })}
            />
            {errors.companyWebsite && (
              <p className="text-sm text-red-500">
                {errors.companyWebsite.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug" className="block text-sm font-medium">
              Slug
            </Label>
            <Input
              placeholder="Ex: tony-stark"
              type="text"
              id="slug"
              {...register("slug", { required: "Slug is required" })}
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          {/* About */}
          <div className="flex flex-col gap-2 lg:col-span-2">
            <Label htmlFor="about" className="block text-sm font-medium">
              About
            </Label>
            <Textarea
              placeholder="Tell us about the member"
              id="about"
              rows={5}
              className="border border-gray-300 p-2 rounded"
              {...register("about", { required: "About section is required" })}
            />
            {errors.about && (
              <p className="text-sm text-red-500">{errors.about.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="userImage"
              className="block text-sm font-medium pb-2"
            >
              Services
            </Label>
            <TagsInput
              value={services}
              onValueChange={setServices}
              maxItems={1000}
              placeholder="Enter Services"
              className="w-full rounded-md border border-slate-400 bg-transparent px-3 py-1 text-sm shadow-sm"
            />
          </div>

          <div className="w-full col-span-2 bg-gray-900 rounded-md text-xs p-2 font-bold text-white">
            <h3>Image Section</h3>
          </div>

          <div>
            <Label htmlFor="userImage" className="block text-sm font-medium">
              Profile Image
            </Label>
            <FileUploaderComponent
              files={profileImage}
              setFiles={setProfileImage}
              maxFiles={1}
              multiple={false}
            />
          </div>
          <div>
            <Label htmlFor="userImage" className="block text-sm font-medium">
              Banner Image
            </Label>
            <FileUploaderComponent
              files={bannerImage}
              setFiles={setBannerImage}
              maxFiles={1}
              multiple={false}
            />
          </div>

          <div>
            <Label htmlFor="userImage" className="block text-sm font-medium">
              Post Images
            </Label>
            <FileUploaderComponent
              files={postImages}
              // @ts-ignore
              setFiles={setPostImages}
              maxFiles={8}
              multiple={true}
            />
          </div>

          <div className="w-full col-span-2 bg-gray-900 rounded-md text-xs p-2 font-bold text-white">
            <h3>Social Links</h3>
          </div>

          <div>
            <Label htmlFor="instagram" className="block text-sm font-medium">
              Instagram
            </Label>
            <Input
              placeholder="Instagram"
              type="text"
              id="instagram"
              {...register("instagram")}
            />
            {errors.instagram && (
              <p className="text-sm text-red-500">{errors.instagram.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="linkedin" className="block text-sm font-medium">
              Linkedin
            </Label>
            <Input
              placeholder="Linkedin"
              type="text"
              id="linkedin"
              {...register("linkedin", { required: "Linkedin is required" })}
            />
            {errors.linkedin && (
              <p className="text-sm text-red-500">{errors.linkedin.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="facebook" className="block text-sm font-medium">
              Facebook
            </Label>
            <Input
              placeholder="Facebook"
              type="text"
              id="facebook"
              {...register("facebook", { required: "Facebook is required" })}
            />
            {errors.facebook && (
              <p className="text-sm text-red-500">{errors.facebook.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="twitter" className="block text-sm font-medium">
              Twitter
            </Label>
            <Input
              placeholder="Twitter"
              type="text"
              id="twitter"
              {...register("twitter", { required: "Twitter is required" })}
            />
            {errors.twitter && (
              <p className="text-sm text-red-500">{errors.twitter.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="youtube" className="block text-sm font-medium">
              Youtube
            </Label>
            <Input
              placeholder="Youtube"
              type="text"
              id="youtube"
              {...register("youtube", { required: "Youtube is required" })}
            />
            {errors.youtube && (
              <p className="text-sm text-red-500">{errors.youtube.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="mail" className="block text-sm font-medium">
              Mail
            </Label>
            <Input
              placeholder="Mail"
              type="text"
              id="mail"
              {...register("mail", { required: "Mail is required" })}
            />
            {errors.mail && (
              <p className="text-sm text-red-500">{errors.mail.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="whatsapp" className="block text-sm font-medium">
              Whatsapp
            </Label>
            <Input
              placeholder="Whatsapp"
              type="text"
              id="whatsapp"
              {...register("whatsapp", { required: "Whatsapp is required" })}
            />
            {errors.whatsapp && (
              <p className="text-sm text-red-500">{errors.whatsapp.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="website" className="block text-sm font-medium">
              Website
            </Label>
            <Input
              placeholder="Website"
              type="text"
              id="website"
              {...register("website", { required: "Website is required" })}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex lg:col-span-2 justify-start">
            <Button
              type="submit"
              variant={"outline"}
              disabled={isPending}
              className="px-4 py-2 text-black rounded font-bold bg-white"
            >
              Add Member
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
