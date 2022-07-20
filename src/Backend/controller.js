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
const getAllUsers = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM students;')
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
        let data = await client.query('SELECT * FROM students where student_id = $1', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewUser = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('', [])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewAdmin = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('', [])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneUserByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('')
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
        let data = await client.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [req.params.id])
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
    try {
        let client = await pool.connect()
        let data = await client.query('', [])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneCohortByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('', [])
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
        let data = await client.query('DELETE FROM cohorts WHERE cohort = $1 RETURNING *', [req.params.id])
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
    deleteOneUserByID,
    getAllCohorts,
    getOneCohortByID,
    createNewCohort,
    updateOneCohortByID,
    deleteOneCohortByID
}