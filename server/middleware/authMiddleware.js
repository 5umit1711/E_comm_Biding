import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../routes/userRoutes.js";

const authorization = (req,res,next)=>{
    try{
        const token = req.header("authorization").split(" ")[1];
        const decrptToken = jwt.verify(token, TOKEN_SECRET);
        req.body.userID = decrptToken.userID;
        next();
    }
    catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
}

export default authorization;