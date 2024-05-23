import UserModel from "../database/models/user.model.js";
import DTO from "../DTO/user.dto.js";

export const getUser = async (req, res) => {
    const { userId } = req.params;

    if (userId.length < 24 || userId.length > 24) {
        return res.status(400).json({ error: "Invalid [ID] provided" });
    }

    try {
        const user = await UserModel.findOne({ _id: userId });

        if (!user) return res.status(404).json({ msg: "user not found" });

        const userDTO = new DTO(user);

        return res.status(200).json({ user: userDTO });
    } catch (error) {
        return (
            res.status(500).json({ error: "Internal server error" }),
            console.log(error.message)
        );
    }
};
