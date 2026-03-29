const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
console.log("ENV TEST:", process.env.MONGO_URI);  
const app = express();
const server = http.createServer(app);
const walletRoutes = require("./src/routes/walletRoutes");

const mechanicRoutes = require("./src/routes/mechanics");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const serviceRoutes = require("./src/routes/serviceRoutes");
const authMiddleware = require("./src/middlewares/auth");
const roleMiddleware = require("./src/middlewares/role");

// DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/wallet", walletRoutes);
// Protected
app.get("/api/user/dashboard", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({ message: "User Dashboard ✅" });
});

app.get("/api/mechanic/dashboard", authMiddleware, roleMiddleware("mechanic"), (req, res) => {
  res.json({ message: "Mechanic Dashboard 🔧" });
});

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Protected route working ✅", user: req.user });
});
app.use(require("./src/middlewares/errorHandler"));
// Socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

// Start
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});