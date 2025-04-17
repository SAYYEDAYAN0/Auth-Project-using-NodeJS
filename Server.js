
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


// Require routes
const mainRoutes = require("./routes/main-routes")

app.use(mainRoutes)


const registrationRoutes = require("./routes/registration-routes")
app.use(registrationRoutes)


const loginRoutes = require("./routes/login-routes")
app.use(loginRoutes)



app.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

