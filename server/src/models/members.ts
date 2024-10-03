import { Schema, model } from "mongoose";

const MemberSchema = new Schema(
  {
    username: String,
    position: String,
    bannerImage: String,
    userImage: String,
    email: String,
    phone: String,
    companyName: String,
    companyWebsite: String,
    services: [String],
    about: String,
    pictures: [String],
    instagram: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    youtube: String,
    mail: String,
    whatsapp: String,
    website: String,
    slug: String,
    key:{type:String,
      enum:["member","leader"],
      default:"member",
    },
  },
  {
    timestamps: true,
  }
);

const Member = model("Member", MemberSchema);

export { Member };
