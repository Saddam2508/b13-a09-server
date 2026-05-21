import sendResponse from "../../utility/sendResponse";
import { facilitiesService } from "./facilities.service";
const createFacilities = async (req, res) => {
    try {
        const result = await facilitiesService.createFacilitiesIntoDB(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "facility Created successfully!",
            data: result
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getAllFacilities = async (req, res) => {
    try {
        const result = await facilitiesService.getAllFacilitiesFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrived successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const updateFacility = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await facilitiesService.updateFacilityFromDB(req.body, id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Facility Not found!",
            });
        }
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "Facility updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const deleteFacility = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await facilitiesService.deleteFacilityFromDB(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Facility Not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Facility deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
export const facilitiesController = {
    createFacilities,
    getAllFacilities,
    updateFacility,
    deleteFacility
};
//# sourceMappingURL=facilities.controller.js.map