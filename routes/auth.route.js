const {Router} = require("express")
const authRouter = Router()
const User = require("../models/User")
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
//registration
authRouter.post(   
        '/registration', 
        [   
            check("email", "некорректный email").isEmail(),
            check("password", "Некорректный пароль").isLength({min: 6})
        ], 
        async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {email, password} = req.body
        const isUser = await User.findOne({email})
        if(isUser){
            return res.status(400).json({message: "Данный E-mail уже существует, попробуйте другой"})
        }
        const hashPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email, password: hashPassword
        })

        await user.save()

        res.status(201).json({message:"Пользователь создан"})
    } catch (error) {
        console.log(error)
    }
})

//login
authRouter.post(   
    '/login', 
    [   
        check("email", "некорректный email").isEmail(),
        check("password", "Некорректный пароль").isLength({min: 6})
    ], 
    async (req, res)=>{
try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(300).json({message: "Пользователь не найден"})
    }
    //const hashPassword = await bcrypt.hash(password, 12)

    const isMatch = bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(300).json({message: "Пароли не совпадают"})
    }
    const secretKey = "secretKey"

    const token = jwt.sign(
        {userId: user.id},
        secretKey,
        {expiresIn:"1h"}
    )
    res.json({token, userId:user.id})
} catch (error) {
    console.log(error)
}
})

module.exports = authRouter