// import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { Logestic } from "logestic";
import { authRouter } from "./src/auth";
import { memberRouter } from "./src/routes";
import { connectToDb } from "./src/utils/db";

const app = new Elysia({
  prefix: "/api",
});

app.use(Logestic.preset("commontz"));
// app.use(cors());

app.use(
  swagger({
    path: "/docs",
    autoDarkMode: false,
    exclude: ["/docs", "/docs/json"],
  })
);

connectToDb().then(async () => {
  app.use(memberRouter);
  app.use(authRouter);

  // let salt = await genSalt(10);

  // const user = new User({
  //   email: "admin@example.com",
  //   password: await hash("adminadmin", salt),
  // });

  // await user.save();

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
