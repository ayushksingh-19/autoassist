const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const compression = require("compression");
require("dotenv").config();

const env = require("./src/config/env");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const serviceRoutes = require("./src/routes/serviceRoutes");
const mechanicRoutes = require("./src/routes/mechanics");
const walletRoutes = require("./src/routes/walletRoutes");
const authMiddleware = require("./src/middlewares/auth");
const roleMiddleware = require("./src/middlewares/role");
const errorHandler = require("./src/middlewares/errorHandler");
const noSqlSanitize = require("./src/middlewares/noSqlSanitize");

const app = express();
const server = http.createServer(app);

connectDB();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: env.requestBodyLimit }));
app.use(noSqlSanitize);
app.use(hpp());
app.use(compression());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX || 300),
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.AUTH_RATE_LIMIT_MAX || 20),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

app.use(generalLimiter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/api/user/dashboard", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({ message: "User dashboard ready" });
});

app.get("/api/mechanic/dashboard", authMiddleware, roleMiddleware("mechanic"), (req, res) => {
  res.json({ message: "Mechanic dashboard ready" });
});

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Protected route working", user: req.user });
});

app.use(errorHandler);

const io = new Server(server, {
  cors: {
    origin: env.allowedOrigins,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  if (!env.isProduction) {
    console.log("User connected:", socket.id);
  }
});

server.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
