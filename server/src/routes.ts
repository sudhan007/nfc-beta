import Elysia, { t } from "elysia";
import slugify from "slugify";
import { deliverFile, saveFile } from "./lib/files3";
import { Member } from "./models/members";

const memberRouter = new Elysia({
  prefix: "/members",
})
  .post(
    "/addmember",
    async ({ body, set }) => {
      try {
        const {
          username,
          position,
          email,
          about,
          bannerImage,
          userImage,
          pictures = [],
          services,
          companyName,
          companyWebsite,
          phone,

          slug,
          facebook,
          instagram,
          linkedin,
          twitter,
          youtube,
          mail,
          whatsapp,
          website,
        } = body;

        const existing = await Member.findOne({ companyName, slug });

        if (existing) {
          return {
            msg: "User / Company Name already exists",
          };
        }

        let _slug = !slug ? slugify(username) : slug;
        _slug = _slug.toLowerCase();

        const bannerBlob = new Blob([bannerImage], {
          type: "image/png",
        });

        const userBlob = new Blob([userImage], {
          type: "image/png",
        });

        // @ts-ignore
        const { filename, ok } = await saveFile(bannerBlob, "banners");

        const { filename: userImageFilename, ok: da } = await saveFile(
          // @ts-ignore
          userBlob,
          "user"
        );

        let picturesFilenames = [];

        for (let i = 0; i < pictures.length; i++) {
          // @ts-ignore
          const pictureBlob = new Blob([pictures[i]], {
            type: "image/png",
          });
          // @ts-ignore
          const { filename, ok } = await saveFile(pictureBlob, "posts");

          picturesFilenames.push(filename);
        }

        const newMember = new Member({
          username,
          position,
          bannerImage: filename,
          userImage: userImageFilename,
          email,
          phone,
          companyName,
          companyWebsite,
          services: JSON.parse(services),
          about,
          pictures: picturesFilenames,
          slug: _slug,
          facebook,
          instagram,
          linkedin,
          twitter,
          youtube,
          mail,
          whatsapp,
          website,
        });

        await newMember.save();

        set.status = 201;

        return {
          msg: "User created successfully",
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error creating user",
        };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        position: t.String(),
        email: t.String(),
        phone: t.String(),
        companyName: t.String(),
        companyWebsite: t.String(),
        services: t.String(),
        about: t.String(),
        userImage: t.File(),
        bannerImage: t.File(),
        pictures: t.Optional(t.Files()),
        slug: t.String(),
        instagram: t.String(),
        linkedin: t.String(),
        facebook: t.String(),
        twitter: t.String(),
        youtube: t.String(),
        mail: t.String(),
        whatsapp: t.String(),
        website: t.String(),
      }),
    }
  )
  .get(
    "/getmembers",
    async ({ set }) => {
      try {
        const members = await Member.find(
          { $and: [ { key: { $exists: false } }, { key: { $ne: "leader" } } ] },
          "username position companyName userImage slug"
        );

        let newMembers = [];

        for (let i of members) {
          const { data } = await deliverFile(i.userImage);
          // @ts-ignore
          newMembers.push({ ...i._doc, userImage: data });
        }

        set.status = 200;

        return {
          msg: "Members retrieved successfully",
          members: newMembers,
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error retrieving members",
        };
      }
    },
    {}
  )
  .get(
    "/getleader",
    async ({ set }) => {
      try {
        const leader = await Member.find(
          { key: "leader" }, 
          "username position companyName userImage slug"
        );

        let newleaders = [];

        for (let i of leader) {
          const { data } = await deliverFile(i.userImage);
          // @ts-ignore
          newleaders.push({ ...i._doc, userImage: data });
        }

        set.status = 200;

        return {
          msg: "Leader retrieved successfully",
          leaders: newleaders,
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error retrieving members",
        };
      }
    },
    {}
  )
  .get(
    "/view",
    async ({ set, query }) => {
      try {
        let { key } = query;

        const file = Bun.file(key);
        let buffer = await file.arrayBuffer();

        const sharp = await import("sharp");
        const compressedBuffer = await sharp
          .default(Buffer.from(buffer))
          .toBuffer();

        const blob = new Blob([compressedBuffer], {
          type: "image/png",
        });

        set.headers["Content-Type"] = "image/png";

        return blob;
      } catch (error: any) {
        set.status = 400;

        console.error(error);

        return {
          message: error.message,
          ok: false,
        };
      }
    },
    {
      query: t.Object({
        key: t.String(),
      }),
      detail: {
        tags: ["File"],
        description: "View a file",
      },
    }
  )
  .get(
    "/viewS3",
    async ({ set, query }) => {
      let { ok, data }: any = await deliverFile(query.key);

      if (ok) {
        const blob = new Blob([data as Uint8Array], {
          type: "image/png",
        });

        set.headers["Content-Type"] = "image/png";

        return blob;
      }

      return {
        message: "File not found",
        ok: false,
      };
    },
    {
      query: t.Object({
        key: t.String(),
      }),
      detail: {
        tags: ["File"],
        description: "View a file",
      },
    }
  )
  .get(
    "/getmember",
    async ({ set, query }) => {
      try {
        const member = await Member.findOne({ slug: query.slug });

        if (!member) {
          set.status = 404;
          return {
            msg: "Member not found",
          };
        }

        set.status = 200;

        const { data } = await deliverFile(member.userImage);
        const { data: bannerData } = await deliverFile(member.bannerImage);

        member.userImage = data;
        member.bannerImage = bannerData;

        if (!member.website && member.companyWebsite) {
          member.website = member.companyWebsite;
        }

        if (!member.mail && member.email) {
          member.mail = member.email;
        }

        let newPics = [];

        for (let i of member.pictures) {
          const { data } = await deliverFile(i);
          // @ts-ignore
          newPics.push(data);
        }

        member.pictures = newPics;

        return {
          msg: "Member retrieved successfully",
          member: member,
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error retrieving member",
        };
      }
    },
    {
      query: t.Object({
        slug: t.String(),
      }),
      detail: {
        tags: ["Member"],
        description: "Get a member",
      },
    }
  )
  .get(
    "/all",
    async ({ set, query }) => {
      try {
        const { limit, page } = query;

        let _limit = limit || 8;
        let _page = page || 1;

        const members = await Member.find({  })
        .skip((_page - 1) * _limit)
        .limit(_limit)
        .exec();

        const total = await Member.countDocuments();

        let newMembers = [];

        for (let i of members) {
          const { data } = await deliverFile(i.userImage);
          // @ts-ignore
          newMembers.push({ ...i._doc, userImage: data });
        }

        set.status = 200;

        return {
          msg: "Members retrieved successfully",
          employees: newMembers,
          total: total,
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error retrieving members",
        };
      }
    },
    {
      query: t.Object({
        limit: t.Number(),
        page: t.Number(),
      }),
      detail: {
        tags: ["Member"],
        description: "Get a member",
      },
    }
  )
  .delete(
    "/deletemember",
    async ({ set, query }) => {
      try {
        const member = await Member.deleteOne({ slug: query.slug });

        if (!member) {
          set.status = 404;
          return {
            msg: "Member not found",
          };
        }

        set.status = 200;

        return {
          msg: "Member deleted successfully",
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error deleting member",
        };
      }
    },
    {
      query: t.Object({
        slug: t.String(),
      }),
      detail: {
        tags: ["Member"],
        description: "Delete a member",
      },
    }
  )
  .put(
    "/updatemember",
    async ({ set, body }) => {
      try {
        const {
          username,
          position,
          email,
          phone,
          companyName,
          companyWebsite,
          services,
          about,
          slug,
          instagram,
          linkedin,
          facebook,
          twitter,
          youtube,
          mail,
          whatsapp,
          website,
          bannerImage,
          userImage,
          pictures = [],
        } = body;

        const existing = await Member.findOne({ slug });

        if (!existing) {
          return {
            msg: "Company Not Found",
          };
        }

        let _slug = !slug ? slugify(username) : slug;
        _slug = _slug.toLowerCase();

        let profileImg: any = null;
        let bannerImg: any = null;

        if (bannerImage) {
          const bannerBlob: any = new Blob([bannerImage], {
            type: "image/png",
          });

          const { filename, ok } = await saveFile(bannerBlob, "banners");

          bannerImg = filename;
        }

        if (userImage) {
          const userBlob: any = new Blob([userImage], {
            type: "image/png",
          });

          const { filename, ok } = await saveFile(userBlob, "user");

          profileImg = filename;
        }

        let picturesFilenames = existing.pictures;

        if (pictures && pictures.length > 0) {
          for (let i = 0; i < pictures.length; i++) {
            // @ts-ignore
            const pictureBlob = new Blob([pictures[i]], {
              type: "image/png",
            });
            // @ts-ignore
            const { filename, ok } = await saveFile(pictureBlob, "posts");

            picturesFilenames.push(filename);
          }
        }

        existing.username = username ? username : existing.username;
        existing.position = position ? position : existing.position;
        existing.email = email ? email : existing.email;
        existing.phone = phone ? phone : existing.phone;
        existing.companyName = companyName ? companyName : existing.companyName;
        existing.companyWebsite = companyWebsite
          ? companyWebsite
          : existing.companyWebsite;
        // @ts-ignore
        existing.services = services ? JSON.parse(services) : existing.services;
        existing.about = about ? about : existing.about;
        existing.slug = _slug;
        existing.instagram = instagram ? instagram : existing.instagram;
        existing.linkedin = linkedin ? linkedin : existing.linkedin;
        existing.facebook = facebook ? facebook : existing.facebook;
        existing.twitter = twitter ? twitter : existing.twitter;
        existing.youtube = youtube ? youtube : existing.youtube;
        existing.mail = mail ? mail : existing.mail;
        existing.whatsapp = whatsapp ? whatsapp : existing.whatsapp;
        existing.website = website ? website : existing.website;
        existing.bannerImage = bannerImg ? bannerImg : existing.bannerImage;
        existing.userImage = profileImg ? profileImg : existing.userImage;
        existing.pictures =
          picturesFilenames.length > 0 ? picturesFilenames : existing.pictures;

        await existing.save();

        set.status = 201;

        return {
          msg: "User Updated Successfully",
        };
      } catch (error) {
        set.status = 500;
        console.error(error);
        return {
          msg: "Error creating user",
        };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        position: t.String(),
        email: t.String(),
        phone: t.String(),
        companyName: t.String(),
        companyWebsite: t.String(),
        services: t.String(),
        about: t.String(),
        userImage: t.Optional(t.File()),
        bannerImage: t.Optional(t.File()),
        pictures: t.Optional(t.Files()),
        slug: t.String(),
        instagram: t.String(),
        linkedin: t.String(),
        facebook: t.String(),
        twitter: t.String(),
        youtube: t.String(),
        mail: t.String(),
        whatsapp: t.String(),
        website: t.String(),
      }),
    }
  );
export { memberRouter };
