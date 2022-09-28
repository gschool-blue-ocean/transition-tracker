import pool from "../../../database/connection";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { slug } = req.query;
  switch (req.method) {
    case "PATCH":
      if (slug[0] === "user") {
        const {
          first,
          last,
          email,
          username,
          password,
          rank,
          branch,
          duty_station,
          taps_complete,
          leave_start_date,
          ets_date,
          planning_to_relocate,
          city,
          state,
          relocate_to_country,
          relocate_city,
          relocate_state,
          relocate_country,
          has_dependents,
          highest_education,
          seeking_further_education,
          admin,
          cohort_name,
          cohort_id,
          new_user,
          mos,
          interests,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
          let client = await pool.connect();
          let data = await client.query(
            "UPDATE users SET first = $1, last = $2, email = $3, username = $4, password = $5, rank = $6, branch = $7, duty_station = $8, taps_complete = $9, leave_start_date = $10, ets_date = $11, planning_to_relocate = $12, city = $13, state = $14, relocate_to_country = $15, relocate_city = $16, relocate_state = $17, relocate_country = $18, has_dependents = $19, highest_education = $20, seeking_further_education = $21, admin = $22, cohort_name = $23, cohort_id = $24, new_user = $25, mos=$26, interests = $27 WHERE user_id = $28 RETURNING *",
            [
              first,
              last,
              email,
              username,
              hashedPassword,
              rank,
              branch,
              duty_station,
              taps_complete,
              leave_start_date,
              ets_date,
              planning_to_relocate,
              city,
              state,
              relocate_to_country,
              relocate_city,
              relocate_state,
              relocate_country,
              has_dependents,
              highest_education,
              seeking_further_education,
              admin,
              cohort_name,
              cohort_id,
              new_user,
              mos,
              interests,
              slug[1],
            ]
          );
          res.json(data.rows);
          client.release();
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      } else if (slug[0] === "admin") {
        let { first, last, email, username, password } = req.body;

        try {
          let client = await pool.connect();
          let data = await client.query(
            "UPDATE users SET first = $1, last = $2, email = $3, username = $4, password = $5 WHERE user_id = $6 RETURNING *",
            [first, last, email, username, password, slug[1]]
          );
          res.json(data.rows);
          client.release();
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      } else if ( slug[0] === 'cohort'){
        const { cohort_name, start_date, end_date, active } = req.body

        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE cohorts SET cohort_name = $1, start_date = $2, end_date = $3, active = $4 WHERE cohort_id = $5 RETURNING *', [cohort_name, start_date, end_date, active, slug[1]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      }else if(slug[0] === 'dependent'){
        const { age, relation } = req.body

        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE dependents SET age = $1, relation = $2 WHERE dependent_id = $3 RETURNING *', [age, relation, slug[1]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      }else if(slug[0] === 'task'){
        const { title, date, description, remarks, completed } = req.body

        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE tasks SET title = $1, date = $2, description = $3, remarks = $4, completed = $5 WHERE task_id = $6 RETURNING *', [title, date, description, remarks, completed, slug[1]])
            res.json(data.rows)
            client.release()
    
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      } else if(slug[0] === 'comment'){
        const { content } = req.body

        try {
            let client = await pool.connect()
            let data = await client.query('UPDATE comments SET content = $1 WHERE comment_id = $2 RETURNING *', [content, slug[1]])
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
