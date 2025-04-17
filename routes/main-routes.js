const route = require('express').Router()

route.get('/', (req, res) => {
    res.render("registration")
})

route.get("/login", (req, res) => {
    res.render("login")

})


module.exports = route;