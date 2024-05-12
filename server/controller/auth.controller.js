import bcryptjs from "bcryptjs";
import userModel from "../database/models/user.model.js";
import { genToken, storeToken } from "../services/webToken.js";
import tokenModel from "../database/models/token.model.js";

export const Register = async (req, res, next) => {
    try {
        const { name, username, password, confirmPassword, gender } = req.body;

        // [CHEAKING IS ALL DATA COMPLETE]
        if (!name || !username || !password || !confirmPassword || !gender) {
            return res.status(500).json({ error: "In-complete data" });
        }

        // [CHEAKING THE LENGTH OF PASSWORD]
        if (username.length < 8) {
            return res
                .status(500)
                .json({ error: "username must at least 8 character" });
        }

        // [CHEAKING THE CONFIRM PASSWORD WITH PASSWORD]
        if (password !== confirmPassword) {
            return res
                .status(500)
                .json({ error: "confirm password must match to the password" });
        }

        // [HASH THE PASSWORD]
        const salts = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salts);

        // [IS USERNAME AVAILIBLE OR NOT]
        const userNameIsExists = await userModel.findOne({ username });
        if (userNameIsExists) {
            return res.status(303).json({ error: "username already taken" });
        }

        // [IF NOT EXISTS THEN REGISTER THE USER IN DB]
        if (!userNameIsExists) {
            const user = new userModel({
                name,
                username,
                gender,
                password: hashedPassword,
            });

            // [GENERATE JWT TOKEN]
            const TOKEN = await genToken(user._id, "60m");

            // [SEND TOKEN VIA COOKIE]
            res.cookie("TOKEN", TOKEN, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });

            // [STORE TOKEN IN DB]
            storeToken(TOKEN, user._id);

            await user.save();

            return res.status(201).json({ user });
        }
    } catch (error) {
        return (
            res.status(error.status).json({ error: error.message }),
            console.log("[ERROR IN REGISTER CONTROLLER =>]", error)
        );
    }
};

export const Login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(500).json({ error: "in-complete data" });
    }

    try {
        const user = await userModel.findOne({
            username,
        });

        if (!user) {
            return res.status(401).json({ error: "invalid username" });
        }

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "invalid password" });
        }

        const TOKEN = await genToken(user._id, "60m");

        res.cookie("TOKEN", TOKEN, {
            maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });

        await storeToken(TOKEN, user._id);

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(error.status).json(error.message), console.log(error);
    }
};

export const Logout = async (req, res, next) => {
    try {
        const { userId } = req;
        const { TOKEN } = req.cookies;

        await tokenModel.findOneAndDelete({ token: TOKEN, userId });

        res.clearCookie("TOKEN");

        return res.status(200).json({ message: "Logout succesfully" });
    } catch (error) {
        return (
            res.status(500).json({ error: "internal server error" }),
            console.log("[ERRER IN LOGOUT CONTROLLER]", error.message)
        );
    }
};
