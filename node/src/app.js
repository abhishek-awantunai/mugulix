require("dotenv").config();

const cors = require("cors");
const express = require("express");
const homeRoutes = require("./routers/moglix/home.router");
const adminRoutes = require("./routers/admin/user.router");
const productRoutes = require("./routers/admin/product.router");
const categoryRoutes = require("./routers/admin/category.router");

const PORT = process.env.PORT || 3000;
const APP_PORT = process.env.APP_PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/category", categoryRoutes);
app.use("/api/admin/product", productRoutes);

// Moglix Routes
app.use("/api/moglix", adminRoutes);
app.use("/api/moglix/category", categoryRoutes);
app.use("/api/moglix/product", productRoutes);
app.use("/api/moglix/home", homeRoutes);

app.listen(PORT, () => {
  console.log(
    "App is up and running frontend port : " +
    APP_PORT +
    " and backend port : " +
    PORT
  );
});
