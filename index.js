import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";
import router from "./Routers/authRouter.js";
import Rooms from "./Routers/roomRouter.js";
import Residents from "./Routers/residentRouter.js";
import Maintenance from "./Routers/maintenanceRouter.js";
import Billing from "./Routers/billingRouter.js";
import Payment from "./Routers/payment.js";
import financialRouter from "./Routers/financialRouter.js";
import user from "./Routers/userRouter.js"
import notifications from "./Routers/notificationRouter.js"
import Admin from "./Routers/adminRouter.js"



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get("/", (req, res) => {
    res.send("Welcome to Backend");
});
app.use("/api/auth", router);
app.use("/api/rooms", Rooms);
app.use("/api/residents", Residents)
app.use("/api/maintenance", Maintenance)
app.use("/api/billing", Billing)
app.use("/api/payment", Payment)
app.use("/api/financial", financialRouter)
app.use("/api/users", user)
app.use("/api/notifications", notifications)
app.use("/api/admin", Admin)


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port `,port);
});