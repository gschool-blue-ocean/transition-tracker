require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./src/Backend/controller");
const path = require("path");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Listening on port: ${PORT}`);
});

//! ------------Routes---------
app.get('/', controller.testRoute)

app.get('/api/students', controller.getAllStudents)

app.get('/api/student/:id', controller.getOneStudentByID)

app.post('/api/create/student', controller.createNewStudent)

app.patch('/api/update/student/:id', controller.updateOneStudentByID)

app.delete('/api/delete/student/:id', controller.deleteOneStudentByID)

//! ----------------------------

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.use((_, res) => {
    res.status(404);
    res.setHeader("Content-type", "text/plain");
    res.send("Not Found");
});
