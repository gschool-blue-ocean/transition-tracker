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

//Middleware to require all routes have a cookie
// app.all("*", controller.cookiesForAll)

//simple test route sends 'Hello World!'
app.get('/test', controller.testRoute)


// ------------USER/ADMIN Table Routes---------
app.get('/api/users', controller.getAllUsers)

app.get('/api/users/:id', controller.getOneUserByID)

app.post('/api/create/user', controller.createNewUser)

app.post('/api/create/admin', controller.createNewAdmin)

app.post('/api/login', controller.login)

app.patch('/api/update/user/:id', controller.updateOneUserByID)

app.patch('/api/update/admin/:id', controller.updateAdminByID)

app.delete('/api/delete/user/:id', controller.deleteOneUserByID)


// ------------COHORT Table Routes-----------------
app.get('/api/cohorts', controller.getAllCohorts)

app.get('/api/cohorts/:id', controller.getOneCohortByID)

app.post('/api/create/cohort', controller.createNewCohort)

app.patch('/api/update/cohort/:id', controller.updateOneCohortByID)

app.patch('/api/archive/cohort/:id', controller.archiveOneCohortByID)

app.delete('/api/delete/cohort/:id', controller.deleteOneCohortByID)


// --------- DEPENDENTS Table Routes ----------
app.get('/api/dependents', controller.getAllDependents)

app.get('/api/dependents/sponsor/:id', controller.getAllDependentsBySponsorID)

app.get('/api/dependents/:id', controller.getOneDependentByID)

app.post('/api/create/dependent', controller.createNewDependent)

app.patch('/api/update/dependent/:id', controller.updateOneDependentByID)

app.delete('/api/delete/dependent/:id', controller.deleteOneDependentByID)


// --------- TASKS Table Routes -------------
app.get('/api/tasks', controller.getAllTasks)

app.get('/api/tasks/student/:id', controller.getAllTasksByStudentID)

app.get('/api/tasks/:id', controller.getOneTaskByID)

app.post('/api/create/task', controller.createNewTask)

app.patch('/api/update/task/:id', controller.updateOneTaskByID)

app.delete('/api/delete/task/:id', controller.deleteOneTaskByID)


// ------------ COMMENTS Table Routes ------------
app.get('/api/comments', controller.getAllComments)

app.get('/api/comments/student/:id', controller.getAllCommentsByStudentID)

app.get('/api/comments/:id', controller.getOneCommentByID)

app.post('/api/create/comment', controller.createNewComment)

app.patch('/api/update/comment/:id', controller.updateOneCommentByID)

app.delete('/api/delete/comment/:id', controller.deleteOneCommentByID)


// ---------Deployment & 404 route-----------
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.use((_, res) => {
    res.status(404);
    res.setHeader("Content-type", "text/plain");
    res.send("Not Found");
});
