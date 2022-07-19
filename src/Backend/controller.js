const pool = require('./connection.js');

const testRoute = (_, res) => {
    try {
        console.log('working')
        res.send('working')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = {
    testRoute
}