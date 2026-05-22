import { Router } from "express";
import { facilitiesController } from "./facilities.controller";
import verifyToken from "../../utility/verifyToken";

const router = Router();

router.post("/", verifyToken, facilitiesController.createFacilities);
router.get("/", facilitiesController.getAllFacilities);
router.put("/:id", verifyToken, facilitiesController.updateFacility);
router.delete("/:id", verifyToken, facilitiesController.deleteFacility);

export const facilitiesRoute = router;
