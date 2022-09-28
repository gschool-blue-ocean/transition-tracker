import pool from "../../../database/connection";

export default async function handler(req, res) {
  const { slug } = req.query;
  switch (req.method) {
    case "PATCH":
        const { first, last, email, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, mos, interests } = req.body

        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE users SET first = $1, last = $2, email = $3, rank = $4, branch = $5, duty_station = $6, taps_complete = $7, leave_start_date = $8, ets_date = $9, planning_to_relocate = $10, city = $11, state = $12, has_dependents = $13, highest_education = $14, seeking_further_education = $15, mos = $16, interests = $17 WHERE user_id = $18 RETURNING *', [first, last, email, rank, branch, duty_station, taps_complete, leave_start_date, ets_date, planning_to_relocate, city, state, has_dependents, highest_education, seeking_further_education, mos, interests, slug[0]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      break;
    default:
      break;
  }
}
