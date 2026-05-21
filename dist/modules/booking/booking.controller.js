import sendResponse from "../../utility/sendResponse";
import { bookingService } from "./booking.service";
const createBooking = async (req, res) => {
    try {
        const result = await bookingService.createBookingIntoDB(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Booking Created successfully!",
            data: result,
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
const getAllBooking = async (req, res) => {
    try {
        const result = await bookingService.getAllBookingFromDB();
        res.status(200).json({
            success: true,
            message: "Booking retrived successfully!",
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
const updateBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookingService.updateBookingFromDB(req.body, id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Booking Not found!",
            });
        }
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully!",
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
const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookingService.deleteBookingFromDB(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Booking Not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully!",
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
export const bookingController = {
    createBooking,
    getAllBooking,
    updateBooking,
    deleteBooking,
};
//# sourceMappingURL=booking.controller.js.map