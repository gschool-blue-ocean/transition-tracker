import pool from "../../../database/connection";

export default async function handler(req, res) {
  const { slug } = req.query
  switch (req.method) {
    case "DELETE":
      if (slug[0] === "user") {
        try {
            let client = await pool.connect()
            let data = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [slug[1]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      } else if(slug[0] === 'cohort'){
        try {
            let client = await pool.connect()
            let data = await client.query('DELETE FROM cohorts WHERE cohort_id = $1 RETURNING *', [slug[1]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      }else if(slug[0] === 'dependent'){
        try {
          let client = await pool.connect()
          let data = await client.query('DELETE FROM dependents WHERE dependent_id = $1 RETURNING *', [slug[1]])
          res.json(data.rows)
          client.release()
  
      } catch (error) {
          console.log(error)
          res.send(error)
      }
      } else if(slug[0] === 'alldependents'){
        try {
          let client = await pool.connect()
          let data = await client.query('DELETE FROM dependents WHERE sponsor_id = $1 RETURNING *', [slug[1]])
          res.json(data.rows)
          client.release()
  
      } catch (error) {
          console.log(error)
          res.send(error)
      }
      } else if(slug[0] === 'task'){
        try {
          let client = await pool.connect()
          let data = await client.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', slug[1])
          res.json(data.rows)
          client.release()
  
      } catch (error) {
          console.log(error)
          res.send(error)
      }
      }else if(slug[0] === 'alltasks'){
        try {
          let client = await pool.connect()
          let data = await client.query('DELETE FROM tasks WHERE student_id = $1 RETURNING *', slug[1])
          res.json(data.rows)
          client.release()
  
      } catch (error) {
          console.log(error)
          res.send(error)
      }
      }else if(slug[0] === 'comment'){
        try {
          let client = await pool.connect()
          let data = await client.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', slug[1])
          res.json(data.rows)
          client.release()
  
      } catch (error) {
          console.log(error)
          res.send(error)
      }
      }else if(slug[0] === 'allcomments'){
        try {
          let client = await pool.connect()
          let data = await client.query('DELETE FROM comments WHERE student_id = $1 RETURNING *', slug[1])
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
