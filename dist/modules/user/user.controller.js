import sendResponse from "../../utility/sendResponse";
import { userService } from "./user.service";
const createUser = async (req, res) => {
    //   console.log(req.body);
    //   const { name, email, password, age } = req.body;
    try {
        const result = await userService.createUserIntoDB(req.body);
        // console.log(result);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User Created successfully!",
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
const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsersFromDB();
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
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.getSingleUserFromDB(id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found!",
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrived successfully!",
            data: result.rows[0],
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
const updateUser = async (req, res) => {
    const { id } = req.params;
    // console.log("Id : ", id);
    // console.log({ name, password, age, is_active });
    try {
        const result = await userService.updateUserFromDB(req.body, id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found!",
            });
        }
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0],
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
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUserFromDB(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "User Not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: {},
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
export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map