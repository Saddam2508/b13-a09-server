import CookieParser from "cookie-parser";
import cors from "cors";
import express, {} from "express";
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import { userRoute } from "./modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { facilitiesRoute } from "./modules/facilities/facilities.route";
import { bookingRoute } from "./modules/booking/booking.route";
const app = express();
app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // ✅
    credentials: true,
}));
app.get("/", (req, res) => {
    //res.send("Hello World!");
    res.status(200).json({
        message: "Express Server",
        author: "Next Level",
    });
});
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/facilities", facilitiesRoute);
app.use("/api/booking", bookingRoute);
// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=index.js.map