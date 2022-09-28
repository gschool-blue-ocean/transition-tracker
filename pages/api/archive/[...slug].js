import pool from "../../../database/connection";

export default async function handler(req, res) {
  const { slug } = req.query;
  switch (req.method) {
    case "PATCH":
      if (slug[0] === "student") {
        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE users set cohort_id = $1, cohort_name = $2 WHERE user_id = $3 RETURNING *', [1, 'MCSP-00', slug[1]])
            res.json(data)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      } else if (slug[0] === "cohort") {
        const { active } = req.body
        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE cohorts SET active = $1 WHERE cohort_id = $2 RETURNING *', [active, slug[1]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      }
      break;
    default:
      break;
  }
}
