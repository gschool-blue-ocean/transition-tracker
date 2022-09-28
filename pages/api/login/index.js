import pool from '../../../database/connection'
import bcrypt from 'bcrypt'
export default async function handler(req, res) {
  switch(req.method){
    case 'POST':
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
    break;
   }
  }
  