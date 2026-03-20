const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");
const roleMiddleware = require("./middleware/role");
// ✅ DB import
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const app = express();
const server = http.createServer(app);
const authMiddleware = require("./middleware/auth");
app.get(
  "/api/user/dashboard",
  authMiddleware,
  roleMiddleware("user"),
  (req, res) => {
    res.json({ message: "User Dashboard ✅" });
  }
);
app.get(
  "/api/mechanic/dashboard",
  authMiddleware,
  roleMiddleware("mechanic"),
  (req, res) => {
    res.json({ message: "Mechanic Dashboard 🔧" });
  }
);
app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Protected route working ✅", user: req.user });
});
// ✅ CONNECT DATABASE HERE
connectDB();

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
// ✅ Socket setup
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

// ✅ Routes (example)
app.post("/api/auth/login", (req, res) => {
  res.json({ message: "Login working" });
});

// ✅ Start server (LAST)
server.listen(5000, () => {
  console.log("Server running on port 5000");
});