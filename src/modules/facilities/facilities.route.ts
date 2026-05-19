import { Router } from "express";
import { facilitiesController } from "./facilities.controller";


const router = Router();

router.post("/", facilitiesController.createFacilities);
router.get("/", facilitiesController.getAllFacilities);
router.put("/:id", facilitiesController.updateFacility);
router.delete("/:id", facilitiesController.deleteFacility);

export const facilitiesRoute = router;
