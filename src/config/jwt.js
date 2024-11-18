import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;


function sign(data, expiresIn = "1h") {
    const token = jwt.sign(data, SECRET, { expiresIn });
    return token;
}

function verify(token) {
    try {
        const response = jwt.verify(token, SECRET)
        return response;
    } catch (error) {
        console.error(error);
        return { error: "can't verify token", status: 500 }
    }
}

export default {
    sign,
    verify
}