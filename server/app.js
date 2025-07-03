import express, { Router } from "express";
import dotenv from "dotenv";
import { RouterA } from "./router.js";
import cookieParser from "cookie-parser";
dotenv.config();
import { connectDb } from "./Connection/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
const router = Router();
const port = process.env.PORT;

connectDb();
app.use(express.urlencoded({ extended: true })); // handling data from form
app.use(express.json()); //used for body parser -> handling data in json format
app.use(express.static("public")); // // Serve static files from the "public" folder
// res.render() is a method in Express.js used to render dynamic HTML pages using a template engine (like EJS, Pug, Handlebars, etc.).
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONT_END_URL , credentials: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);


app.use("/api", router);

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});

app.get("/", (req, res) => {
  // req.headers()
  // res.cookie("token" , token , {expires:"1d"})
  console.log(req.cookies);
  res.send(`<h1>Hello ji,/h1>`);
  // console.log("hello");
});

RouterA(router);
