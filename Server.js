
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

let userModel = require("./models/User")


app.get('/', (req, res) => {
    res.render("registration")
})

app.get("/login", (req, res) => {
    res.render("login")

})

app.post('/register', async (req, res) => {
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


app.post("/login", async (req, res) => {


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
            // return res.send("login sucssfull")

        }

    })


})


app.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

