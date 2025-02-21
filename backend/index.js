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
import petsRoutes from "./routes/pets.js";
import requestRoutes from "./routes/requests.js";
import { addPet, editPet, updatePetStatus } from "./controllers/pets.js";
import { isAdmin, verifyToken } from "./middleware/middleware.js";
import { updateAllPets } from "./utils/utils.js";

/* CONFIGURATIONS */
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
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/pets/newPet", upload.single("picture"), verifyToken, isAdmin, addPet );
app.put("/pets/:id/editPet", upload.single("picture"), verifyToken, isAdmin, editPet);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/pets", petsRoutes);
app.use("/requests", requestRoutes);

// updateAllPets();

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => {console.log("Database connected!")
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));