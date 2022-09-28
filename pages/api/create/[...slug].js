import pool from "../../../database/connection";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { slug } = req.query;
  switch (req.method) {
    case "POST":
      if (slug[0] === "user") {
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
      } else if (slug[0] === "admin") {
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
      } else if (slug[0] === 'cohort') {
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
      } else if(slug[0] === 'dependent'){
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
      }else if(slug[0] === 'task'){
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
      }else if(slug[0] === 'comment'){
        const { student_id, author_id, author_name, content, date_time } = msgData

        try {
            let client = await pool.connect()
            await client.query('INSERT INTO comments (student_id, author_id, author_name, content, date_time) VALUES ($1, $2, $3, $4, $5) RETURNING *', [student_id, author_id, author_name, content, date_time])
    
        } catch (error) {
            console.log(error)
        }
      }
      break;
    default:
      break;
  }
}
