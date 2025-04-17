const route = require('express').Router()


route.post("/login", async (req, res) => {


    let { password, email } = req.body;

    if (password == "" || email == "") {
        return res.send("Email and Password are needed!")
    }

    let user = await userModel.findOne({ email })

    if (!user) {
        return res.send("login sucssfull")
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {

        if (result) {
            let token = jwt.sign({ email }, "secret")
            res.cookie("token", token)
        }
    })
})

module.exports = route;
