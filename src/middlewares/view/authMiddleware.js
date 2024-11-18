/* import jwt from "../config/jwt.js"

async function isAuthenticated(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    next();
}
async function isAdmin(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    if(!verified.role || verified.role !== "admin"){
        return res.status(403).json({error:"not allowed"});
    }
    next();
}

async function isAdminOrSelfUser(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    const id = parseInt(req.params.id);
    if((!verified.role || verified.role !== "admin")&& id!=verified.user_id){
        return res.status(403).json({error:"not allowed"});
    }

    next();
}

export {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser
} */

// middleware/authMiddleware.js
export function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login?message=Debes iniciar sesión&messageType=error');
}

export function isClient(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'client') {
        return next();
    }
    res.redirect('/?message=No tienes permiso para acceder a esta página&messageType=error');
}

export function isStaff(req, res, next) {
    if (req.session && req.session.user && (req.session.user.role === 'staff' || req.session.user.role === 'admin')) {
        return next();
    }
    res.redirect('/?message=No tienes permiso para acceder a esta página&messageType=error');
}

export function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.redirect('/?message=No tienes permiso para acceder a esta página&messageType=error');
}

export const middleware = {
    isAuthenticated,
    isClient,
    isStaff,
    isAdmin
};

export default middleware;