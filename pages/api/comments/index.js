import pool from '../../../database/connection'

export default async function handler(req, res) {
  switch(req.method){
    case 'GET':
        try {
            let client = await pool.connect()
            let data = await client.query('SELECT * FROM comments ORDER BY comment_id ASC')
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    break;
   }
  }
  