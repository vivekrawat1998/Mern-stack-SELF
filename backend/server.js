const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const express = require("express");
const UserRoutes = require("../backend/routes/UserRoutes");
const ProductRoutes = require("../backend/routes/ProductRoutes")
const connectDatabase = require("./database/database");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser()); // Place cookie-parser middleware here
app.use("/api/v1", UserRoutes);
app.use("/api/v1", ProductRoutes);

const result = dotenv.config({ path: '../backend/config/config.env' });
if (result.error) {
  console.error("Error loading environment variables:", result.error);
  process.exit(1);
}
console.log("Environment variables loaded successfully.");

connectDatabase()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000; // Default port to 3000 if not specified in .env
console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Add middleware to log incoming requests and their cookies
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});
