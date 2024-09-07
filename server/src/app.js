//NPM PACKAGE IMPORTS
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { fileURLToPath } from "url";
const PATH = process.env.PORT || 5000;

import User from "../models/User.js";
import Post from "../models/Posts.js";
import { users, posts } from "../data/index.js";

// ALL FILES IMPORTS
import { register } from "../controllers/auth.js";
import { createPost } from "../controllers/posts.js";
import authRoute from "../routes/auth.js";
import userRoutes from "../routes/users.js";
import postRoutes from "../routes/posts.js";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: ["https://net-nest.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// File Storage
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

//cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage: storage });

// Routes with file upload
app.post("/auth/register", upload.single("picture"), (req, res) => {
  register(req, res);
});

app.post("/posts", verifyToken, upload.single("picture"), (req, res) => {
  createPost(req, res);
});

// Standard Routes
app.use("/auth", authRoute);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//DATABASE CONNECTION
import connectToMongoDB from "../db/conn.js";
import { verifyToken } from "../middleware/auth.js";
connectToMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Successfully Connected");
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });

//Server
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.listen(PATH, () => {
  console.log(`The server is started to port ${PATH}`);
  // User.insertMany(users);
  // Post.insertMany(posts);
});
