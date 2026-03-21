const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/serviceRoutes");
const authMiddleware = require("./middleware/auth");
const roleMiddleware = require("./middleware/role");

// ✅ CREATE APP FIRST
const app = express();
const server = http.createServer(app);

// ✅ CONNECT DB
connectDB();

// ✅ MIDDLEWARES
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

// ✅ PROTECTED ROUTES
app.get("/api/user/dashboard", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({ message: "User Dashboard ✅" });
});

app.get("/api/mechanic/dashboard", authMiddleware, roleMiddleware("mechanic"), (req, res) => {
  res.json({ message: "Mechanic Dashboard 🔧" });
});

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Protected route working ✅", user: req.user });
});

// ✅ SOCKET.IO
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

// ✅ START SERVER
server.listen(5000, () => {
  console.log("Server running on port 5000");
});