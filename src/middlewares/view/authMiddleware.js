

function isAuthenticated(req,res,next){
    console.log(req.session);
    if(req.session.user){
        next();
    }else{
        res.redirect("/login")
    }
}
function isClient(req,res,next){
    if(req.session.user && req.session.user.role==="client"){
        next();
    }else{
        res.redirect("/login")
    }
}

function isStaff(req,res,next){
    if(req.session.user && req.session.user.role==="staff"){
        next();
    }else{
        res.redirect("/login")
    }
}

function isAdmin(req,res,next){
    if(req.session.user && req.session.user.role==="admin"){
        next();
    }else{
        res.redirect("/login")
    }
}



export {
    isAuthenticated,
    isStaff,
    isAdmin,
    isClient
}