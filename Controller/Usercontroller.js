const { hashedpassword, comparepassword, createtoken } = require("../Helper")
const Usermodal = require("../Modal/Usermodal")
const jwt=require("jsonwebtoken")

 const Signup = async(req,res) => {
    try {
        let email = req.body.email
        let password=req.body.password
        let confirmpassword = req.body.confirmpassword
        let username=req.body.username
        
        if (email && password && confirmpassword) {
            let newemail=await Usermodal.findOne({email})
            if (!newemail) {
                if (password == confirmpassword) {
                    password = await hashedpassword(password)
                    confirmpassword=await hashedpassword(confirmpassword)
                    await Usermodal.create({ email, password, confirmpassword,username })
                    res.status(201).json('User data created')
                }
                else {
                    res.status(400).json('Password does not match ')
                }
            }
            else {
                res.status(400).json(`${email} already exists try new email`)
            }
        }
        else {
            res.status(400).json("fill all the field")
        }


    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}


 const login = async(req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password

        if (email && password) {
            let newemail = await Usermodal.findOne({ email })
            if (newemail) {
                if (await comparepassword(password, newemail.password)) {
                    const token = await createtoken({ email: newemail.email, id: newemail._id, password: newemail.password,username:newemail.username})
                    const { password,confirmpassword, ...data } = newemail._doc
                    res.status(200).send({
                        message: "User login successfully",
                        data,
                        token
                    })
                }
                else {
                    res.status(400).json("please enter valid password")
                }
            }
            else {
                res.status(400).json("please enter valid email id")
            }
        }
        else {
            res.status(400).json("fill all the field")
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const refresh = async(req, res) => {
    try {
        const token = req.params.id
        if (token) {
            await jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if (err) {
                    res.status(498).send({
                        message:"Token expired"
                    })
                }
                else {
                    res.json(data)
                }
          })
        }
        else {
            res.status(401).send({
                message:"no token"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
      })
    }
}

module.exports = {
    Signup,
    login,
    refresh
}