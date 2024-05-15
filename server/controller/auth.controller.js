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

            // [SAVE USER IN DB]
            await user.save();

            // [SEND SUCCESS RESPONSE TO THE USER]
            return res.status(201).json({ user });
        }
    } catch (error) {
        return (
            // [SEND FAILURE RESPONSE TO USER]
            res.status(error.status).json({ error: error.message }),
            // [CONSOLE LOG THE ERROR FOR EASY DEBUG]
            console.log("[ERROR IN REGISTER CONTROLLER =>]", error)
        );
    }
};

export const Login = async (req, res, next) => {
    // [DESTUCTURE USER DATA FROM REQUEST BODY]
    const { username, password } = req.body;

    // [CHEAKING IS DATA IS PROVIDED OR NOT]
    if (!username || !password) {
        return res.status(500).json({ error: "in-complete data" });
    }

    try {
        // [CHEAKING USERNAME IN DB]
        const user = await userModel.findOne({
            username,
        });

        // [IF THERE IS NO USERNAME IN DB]
        if (!user) {
            return res.status(401).json({ error: "invalid username" });
        }

        // [CHEAKING THE PASSWORD WITH DATABASE PASSWORD]
        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        // [IF PASSWORD IS WRONGE]
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "invalid password" });
        }

        // [GENERATE JWT TOKEN]
        const TOKEN = await genToken(user._id, "60m");

        // [SEND TOKEN VIA COOKIES]
        res.cookie("TOKEN", TOKEN, {
            maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });

        // [STORE TOKEN IN DB]
        await storeToken(TOKEN, user._id);

        // [SEND SUCCESS RESPONSE TO USER]
        return res.status(200).json({ user });
    } catch (error) {
        return (
            // [SEND FAILURE REQUEST TO USER]
            res.status(error.status).json(error.message),
            // [CONSOLE THE ERROR FOR EASY DEBUG]
            console.log("[ERROR IN AUTH CONTROLLER]", error)
        );
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
