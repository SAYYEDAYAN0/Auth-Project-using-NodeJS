const route = require('express').Router()


route.post('/register', async (req, res) => {
    let { username, email, password } = req.body
    let existinceUser = await userModel.findOne({ email });
    if (existinceUser) {
        return res.send("User already exists")
    }
    else {
        let user = await userModel.create({ username, email, password })
        res.redirect("/login")
    }

    const hash = bcrypt.hashSync(password, 10)


    let user = userModel.create({
        username,
        email,
        password: hash
    })

    let token = jwt.sign({ email }, "secret")
    res.cookie("token", token)
    res.redirect("/login")

})


module.exports = route;