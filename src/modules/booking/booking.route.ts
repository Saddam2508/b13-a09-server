import { Router } from "express";
import { bookingController } from "./booking.controller";
import verifyToken from "../../utility/verifyToken";

const router = Router();

router.post("/", verifyToken, bookingController.createBooking);
router.get("/", verifyToken, bookingController.getAllBooking);
router.put("/:id", verifyToken, bookingController.updateBooking);
router.delete("/:id", verifyToken, bookingController.deleteBooking);

export const bookingRoute = router;
