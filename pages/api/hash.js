import pool from "../../../database/connection";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  switch (req.method) {
    case "PATCH":
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
      break;
    default:
      break;
  }
}
