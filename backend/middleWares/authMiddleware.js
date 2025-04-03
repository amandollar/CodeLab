import jwt from "jsonwebtoken";

const verify = async (req, res, next) => {

    const token = req.header('Authorization');
 
    if (!token) return res.status(401).json({ error: "Un-Authorized" });


    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        res.status(400).json('Invalid token');
    }
}

export default verify;