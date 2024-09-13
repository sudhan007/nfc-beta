import { genSalt, hash } from "bcrypt";
import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);
  // @ts-ignore
  user.password = hash(user.password, salt);

  next();
});

export { User };
