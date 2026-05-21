import { Router } from "express";
import { bookingController } from "./booking.controller";
const router = Router();
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
export const bookingRoute = router;
//# sourceMappingURL=booking.route.js.map