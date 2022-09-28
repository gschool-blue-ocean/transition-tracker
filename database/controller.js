import pool from './connection'
// const admin = require("firebase-admin")
import bcrypt from 'bcrypt'

// const serviceAccount = require("../../ServiceAccountKey.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// const cookiesForAll = async (req, res, next) => {
//     res.cookie("XSRF-TOKEN", req.csrfToken())
//     next();
// }

const testRoute = async (_, res) => {
    try {
        console.log('Hello World!')
        res.send('Hello World!')

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//! ------------USER/ADMIN Table Logic------------
const hashAllPasswords = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE users SET password = $1 WHERE username = $2 RETURNING *', [hashedPassword, username])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getAllUsers = async (_, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM users ORDER BY user_id ASC;')
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

const getAllUsersByCohortID = async (req, res) => {

    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM users WHERE cohort_id = $1', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const createNewUser = async (req, res) => {

    const { first, last, email, username, password, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, admin, cohort_name, cohort_id, new_user, mos, interests } = req.body

    try {
        let client = await pool.connect()
        const hashedPassword = await bcrypt.hash(password, 10);
        let data = await client.query('INSERT INTO users (first, last, email, username, password, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, admin, cohort_name, cohort_id, new_user, mos, interests) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *;', [first, last, email, username, hashedPassword, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, admin, cohort_name, cohort_id, new_user, mos, interests])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM users WHERE username = $1', [username])
        await bcrypt.compare(password, data.rows[0].password, (err, result) => {

            if (result) {
                res.json(data.rows[0])
            } else {
                res.status(401).json('Username or password is incorrect.')
            }
        })
        client.release()
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const createNewAdmin = async (req, res) => {
    const { first, last, email, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        let client = await pool.connect()
        let data = await client.query('INSERT INTO users (first, last, email, username, password, admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [first, last, email, username, hashedPassword, true])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const archiveOneStudentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE users set cohort_id = $1, cohort_name = $2 WHERE user_id = $3 RETURNING *', [1, 'MCSP-00', req.params.id])
        res.json(data)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const adminEditStudentByID = async (req, res) => {
    const { first, last, email, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, mos, interests } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE users SET first = $1, last = $2, email = $3, rank = $4, branch = $5, duty_station = $6, taps_complete = $7, leave_start_date = $8, ets_date = $9, planning_to_relocate = $10, city = $11, state = $12, has_dependents = $13, highest_education = $14, seeking_further_education = $15, mos = $16, interests = $17 WHERE user_id = $18 RETURNING *', [first, last, email, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, mos, interests, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneUserByID = async (req, res) => {
    const { first, last, email, username, password, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, relocate_to_country, relocate_city, relocate_state, relocate_country, has_dependents, highest_education, seeking_further_education, admin, cohort_name, cohort_id, new_user, mos, interests } = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE users SET first = $1, last = $2, email = $3, username = $4, password = $5, rank = $6, branch = $7, duty_station = $8, taps_complete = $9, leave_start_date = $10, ets_date = $11, planning_to_relocate = $12, city = $13, state = $14, relocate_to_country = $15, relocate_city = $16, relocate_state = $17, relocate_country = $18, has_dependents = $19, highest_education = $20, seeking_further_education = $21, admin = $22, cohort_name = $23, cohort_id = $24, new_user = $25, mos=$26, interests = $27 WHERE user_id = $28 RETURNING *', [first, last, email, username, hashedPassword, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, relocate_to_country, relocate_city, relocate_state, relocate_country, has_dependents, highest_education, seeking_further_education, admin, cohort_name, cohort_id, new_user, mos, interests, req.params.id])
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


//! ------------COHORT Table Logic-----------
const getAllCohorts = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM cohorts ORDER BY cohort_id ASC;')
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
    const { cohort_name, start_date, end_date, active } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('INSERT INTO cohorts (cohort_name, start_date, end_date, active) VALUES($1, $2, $3, $4) RETURNING *', [cohort_name, start_date, end_date, active])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneCohortByID = async (req, res) => {

    const { cohort_name, start_date, end_date, active } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE cohorts SET cohort_name = $1, start_date = $2, end_date = $3, active = $4 WHERE cohort_id = $5 RETURNING *', [cohort_name, start_date, end_date, active, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const archiveOneCohortByID = async (req, res) => {
    const { active } = req.body
    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE cohorts SET active = $1 WHERE cohort_id = $2 RETURNING *', [active, req.params.id])
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


//! --------- DEPENDENTS Table logic ----------
const getAllDependents = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM dependents ORDER BY dependent_id ASC')
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getAllDependentsBySponsorID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM dependents WHERE sponsor_id = $1 ORDER BY dependent_id ASC', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getOneDependentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM dependents WHERE dependent_id = $1', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewDependent = async (req, res) => {
    const { sponsor_id, age, relation } = req.body
    try {
        let client = await pool.connect()
        let data = await client.query('INSERT INTO dependents (sponsor_id, age, relation) VALUES ($1, $2, $3) RETURNING *', [sponsor_id, age, relation])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneDependentByID = async (req, res) => {
    const { age, relation } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE dependents SET age = $1, relation = $2 WHERE dependent_id = $3 RETURNING *', [age, relation, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteOneDependentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM dependents WHERE dependent_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteAllDependentsBySponsorID = async (req, res) => {

    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM dependents WHERE sponsor_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//! --------- TASKS Table logic -------------
const getAllTasks = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM tasks ORDER BY task_id ASC')
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getAllTasksByStudentID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM tasks WHERE student_id = $1 ORDER BY task_id ASC', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getOneTaskByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM tasks WHERE task_id = $1', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewTask = async (req, res) => {
    const { student_id, title, date, description, remarks, completed } = req.body
    try {
        let client = await pool.connect()
        let data = await client.query('INSERT INTO tasks (student_id, title, date, description, remarks, completed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [student_id, title, date, description, remarks, completed])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateOneTaskByID = async (req, res) => {
    const { title, date, description, remarks, completed } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE tasks SET title = $1, date = $2, description = $3, remarks = $4, completed = $5 WHERE task_id = $6 RETURNING *', [title, date, description, remarks, completed, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteOneTaskByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteAllTasksByStudentID = async (req, res) => {

    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM tasks WHERE student_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//! -----------COMMENTS Table logic -------------
const getAllComments = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM comments ORDER BY comment_id ASC')
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const getAllCommentsByStudentID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM comments WHERE student_id = $1 ORDER BY comment_id ASC', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const getOneCommentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM comments WHERE comment_id = $1', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const createNewComment = async (msgData) => {
    const { student_id, author_id, author_name, content, date_time } = msgData

    try {
        let client = await pool.connect()
        await client.query('INSERT INTO comments (student_id, author_id, author_name, content, date_time) VALUES ($1, $2, $3, $4, $5) RETURNING *', [student_id, author_id, author_name, content, date_time])

    } catch (error) {
        console.log(error)
    }
}
const updateOneCommentByID = async (req, res) => {
    const { content } = req.body

    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE comments SET content = $1 WHERE comment_id = $2 RETURNING *', [content, req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const deleteOneCommentByID = async (req, res) => {
    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const deleteAllCommentsByStudentID = async (req, res) => {

    try {
        let client = await pool.connect()
        let data = await client.query('DELETE FROM comments WHERE student_id = $1 RETURNING *', [req.params.id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export {
    testRoute,
    hashAllPasswords,
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
    archiveOneCohortByID,
    deleteOneCohortByID,
    getAllDependents,
    getAllDependentsBySponsorID,
    getOneDependentByID,
    createNewDependent,
    updateOneDependentByID,
    deleteOneDependentByID,
    getAllTasks,
    getAllTasksByStudentID,
    getOneTaskByID,
    createNewTask,
    updateOneTaskByID,
    deleteOneTaskByID,
    getAllComments,
    getAllCommentsByStudentID,
    getOneCommentByID,
    createNewComment,
    updateOneCommentByID,
    deleteOneCommentByID,
    login,
    deleteAllCommentsByStudentID,
    deleteAllTasksByStudentID,
    deleteAllDependentsBySponsorID,
    getAllUsersByCohortID,
    archiveOneStudentByID,
    adminEditStudentByID
}

