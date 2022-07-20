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

const getAllStudents = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM students;')
        res.json(data)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getOneStudentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM students where student_id = $1', [req.params.id])
        res.json(data)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewStudent = async (req, res) => {
    try {
        let client = await pool.connect()
        await client.query('', [])
        res.json(req.body)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const updateOneStudentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('')
        res.json(data)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteOneStudentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM students WHERE student_id = $1', [req.params.id])
        res.json(data)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = {
    testRoute,
    getAllStudents,
    getOneStudentByID,
    createNewStudent,
    updateOneStudentByID,
    deleteOneStudentByID
}