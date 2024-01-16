const createProductsAuth = (req, res, next) => {
    if (req.session.admin || req.session.role === "premium") {
        next();
    } else {
        return res.redirect('/products');
    }
}

const adminUsersAuth = (req,res,next) =>{
        if(req.session.role !== "admin"){
            return res.redirect('/login')
        }
        next()
} 

export {createProductsAuth, adminUsersAuth}