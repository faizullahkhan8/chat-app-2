import tokenModel from "../database/models/token.model.js";
import { verifyToken } from "../services/webToken.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const { TOKEN } = req.cookies;
        if (!TOKEN) {
            return res.status(401).json({ error: "token must to provide" });
        }

        const tokenExists = await tokenModel.findOne({
            token: TOKEN,
        });

        if (!tokenExists) {
            return res.status(401).json({ error: "invalid token" });
        }

        const { userId } = await verifyToken(TOKEN);

        req.userId = userId;

        next();
    } catch (error) {
        return (
            res.status(500).json({ error: "internal server errer" }),
            console.log(error)
        );
    }
};
