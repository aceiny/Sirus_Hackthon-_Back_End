const sayHello = (req,res) => res.send('hello')

module.exports = { //exportin functions to use in the router
    sayHello,
}