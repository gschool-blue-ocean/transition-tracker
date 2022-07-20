const pool = require('./connection.js');

const testRoute = async (_, res) => {
    try {
        console.log('working')
        res.send('working')

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//! ------------USER/ADMIN Logic------------
const getAllUsers = async (_, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM users;')
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getOneUserByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM users WHERE user_id = $1', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewUser = async (req, res) => {
    const { first, last, email, username, password, branch, leave_start_date, ets_date, admin, cohort_id } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('INSERT INTO users (first, last, email, username, password, branch, leave_start_date, ets_date, admin, cohort_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;', [first, last, email, username, password, branch, leave_start_date, ets_date, admin, cohort_id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewAdmin = async (req, res) => {
    const { first, last, email, username, password, admin } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('INSERT INTO users (first, last, email, username, password, admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [first, last, email, username, password, admin])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneUserByID = async (req, res) => {
    const { first, last, email, username, password, branch, leave_start_date, ets_date } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE users SET first = $1, last = $2, email = $3, username = $4, password = $5, branch = $6, leave_start_date = $7, ets_date = $8, WHERE user_id = $9 RETURNING *', [first, last, email, username, password, branch, leave_start_date, ets_date, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const updateAdminByID = async (req, res) => {
    const { first, last, email, username, password } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE users SET first = $1, last = $2, email = $3, username = $4, password = $5 WHERE user_id = $6 RETURNING *', [first, last, email, username, password, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteOneUserByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
//? -------------------------------------


//! ------------COHORT Logic-----------
const getAllCohorts = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM cohorts;')
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getOneCohortByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM cohorts WHERE cohort_id = $1;', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewCohort = async (req, res) => {
    const { cohort_name, start_date, end_date } = req.body
    try {
        let client = await pool.connect()
        let data = await client.query('INSERT INTO cohorts (cohort_name, start_date, end_date) VALUES($1, $2, $3) RETURNING *', [cohort_name, start_date, end_date])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneCohortByID = async (req, res) => {
    const { cohort_name, start_date, end_date } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE cohorts SET cohort_name = $1, start_date = $2, end_date = $3 WHERE cohort_id = $4 RETURNING *', [cohort_name, start_date, end_date, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteOneCohortByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM cohorts WHERE cohort_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
//? ----------------------------------

module.exports = {
    testRoute,
    getAllUsers,
    getOneUserByID,
    createNewUser,
    createNewAdmin,
    updateOneUserByID,
    updateAdminByID,
    deleteOneUserByID,
    getAllCohorts,
    getOneCohortByID,
    createNewCohort,
    updateOneCohortByID,
    deleteOneCohortByID
}