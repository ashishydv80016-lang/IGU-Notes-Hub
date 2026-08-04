import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";

dotenv.config();

const app = express();


// ================= DATABASE =================
connectDB();


// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://igu-notes-hub.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());


// ================= ROUTES =================

app.use("/api/users", userRoutes);

app.use("/api/materials", materialRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/downloads", downloadRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin/users", adminUserRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/filters", filterRoutes);


// ================= TEST ROUTES =================

app.get("/", (req, res) => {
  res.send("IGU Notes Hub API is running...");
});


app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API connected successfully"
  });
});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});