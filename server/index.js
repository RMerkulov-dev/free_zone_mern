import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

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
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "./public/assets")));
mongoose.set("strictQuery", false);

//FILE STORAGE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error("Wrong file type");
            error.code = "LIMIT_FILE_TYPES";
            return cb(error, false);
        }
        if (file.size > 5 * 5024 * 5024) {
            // 5MB limit
            const error = new Error("File too large");
            error.code = "LIMIT_FILE_SIZE";
            return cb(error, false);
        }
        cb(null, true);
    },
});

const upload = multer({ storage });

//ROUTES WITH FILES

app.post(
    "/auth/register",
    upload.single("picture"),
    register,
    register,
    (err, req, res, next) => {
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_TYPES") {
            return res.status(400).json({ error: "Wrong file type" });
        }
        next(err);
    }
);
app.post(
    "/posts",
    verifyToken,
    upload.single("picture"),
    createPost,
    (err, req, res, next) => {
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_TYPES") {
            return res.status(400).json({ error: "Wrong file type" });
        }
        next(err);
    }
);

//ROTES

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Ok Port: ${PORT}`));

        //ADD DATA ONE TIME/ NEED TO DELETE
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));
