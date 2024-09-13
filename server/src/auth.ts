import { compare } from "bcrypt";
import Elysia, { t } from "elysia";
import { User } from "./models/user";

export const authRouter = new Elysia({
  prefix: "/auth",
}).post(
  "/login",
  async ({ body, set }) => {
    try {
      const { email, password } = body;

      if (!email || !password) {
        set.status = 400;
        return {
          msg: "Email and password are required",
        };
      }

      const user = await User.findOne({ email });

      if (!user) {
        set.status = 401;
        return {
          msg: "User not found",
        };
      }

      // @ts-ignore
      const isPasswordCorrect = compare(password, user.password);

      if (!isPasswordCorrect) {
        set.status = 401;
        return {
          msg: "Incorrect password",
        };
      }

      set.status = 200;

      return {
        msg: "Login successful",
      };
    } catch (error) {
      set.status = 500;
      console.error(error);
      return {
        msg: "Error logging in",
      };
    }
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);
