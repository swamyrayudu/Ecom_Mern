const express = require('express');
const { Register, Login ,Logout , authMiddlewar } =require('../../controlers/auth/auth-controllers')

const router = express.Router();

router.post('/register',Register);
router.post('/login',Login)
router.post('/logout',Logout)
router.get('/check-auth',authMiddlewar,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"Authonticated User",
        user,
    })
})

module.exports = router;