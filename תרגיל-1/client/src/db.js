const mysql = require('mysql2/promise');
const config = require('./config');
async function query(sql) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql);

    // connection.end((err)=>{
    //   if(err){
    //     console.log("error in end connection")
    //   }
    // });
    return results;
  }
  catch (err) {
    console.log("query error");
    throw err;
  }
}

async function createConnectionA() {
  if (connection) {
    return connection
  }
  connection = await mysql.createConnection(config.db);
  return connection;
}
module.exports = {
  query
}
// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');

// const app = express();
// const port = 3000;

// // Create MySQL connection pool (consider using a pool for efficiency)
// const connectionPool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "ROOT2024",
//   database: "covid_database",
// });

// // Error handling for connection pool creation
// connectionPool.getConnection()
//   .then(() => console.log('Connected to MySQL'))
//   .catch(err => {
//     console.error('Error connecting to MySQL:', err);
//     process.exit(1); // Exit process on critical error
//   });

// app.use(bodyParser.json());

// // CRUD operations (using async/await for promise-based execution)
// async function getAllMembers() {
//   let result = await db.query('select * from members');
//   return result || [];
// }
// // Create a new member
// app.post('/api/members', async (req, res) => {
//   try {
//     const newMember = req.body;
//     const [results] = await connectionPool.query('INSERT INTO members SET ?', newMember);
//     res.status(201).send('Member added successfully');
//   } catch (error) {
//     console.error('Error adding member:', error);
//     res.status(500).send('Error adding member');
//   }
// });

// // Read all members
// app.get('/api/members', async (req, res) => {
//   try {
//     const [results] = await connectionPool.query('SELECT * FROM members');
//     res.send(results);
//   } catch (error) {
//     console.error('Error fetching members:', error);
//     res.status(500).send('Error fetching members');
//   }
// });

// // Read one member by ID
// app.get('/api/members/:id', async (req, res) => {
//   const memberId = req.params.id;
//   try {
//     const [results] = await connectionPool.query('SELECT * FROM members WHERE id = ?', memberId);
//     if (results.length === 0) {
//       res.status(404).send('Member not found');
//     } else {
//       res.send(results[0]);
//     }
//   } catch (error) {
//     console.error('Error fetching member:', error);
//     res.status(500).send('Error fetching member');
//   }
// });

// // Update a member by ID
// app.put('/api/members/:id', async (req, res) => {
//   const memberId = req.params.id;
//   const updatedMember = req.body;
//   try {
//     await connectionPool.query('UPDATE members SET ? WHERE id = ?', [updatedMember, memberId]);
//     res.send('Member updated successfully');
//   } catch (error) {
//     console.error('Error updating member:', error);
//     res.status(500).send('Error updating member');
//   }
// });

// // Delete a member by ID
// app.delete('/api/members/:id', async (req, res) => {
//   const memberId = req.params.id;
//   try {
//     await connectionPool.query('DELETE FROM members WHERE id = ?', memberId);
//     res.status(204).send('Member deleted successfully');
//   } catch (error) {
//     console.error('Error deleting member:', error);
//     res.status(500).send('Error deleting member');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
