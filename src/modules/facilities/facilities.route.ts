import { Router } from "express";
import { facilitiesController } from "./facilities.controller";


const router = Router();

router.post("/", facilitiesController.createFacilities);
router.get("/", facilitiesController.getAllFacilities);


export const facilitiesRoute = router;
