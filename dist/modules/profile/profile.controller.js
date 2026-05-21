import { profileService } from "./profile.service";
const createProfile = async (req, res) => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "Profile created successfully!",
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
export const profileController = {
    createProfile,
};
//# sourceMappingURL=profile.controller.js.map