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

//simple test route sends 'working'
app.get('/', controller.testRoute)

//! ------------USER/ADMIN Routes---------
app.get('/api/users', controller.getAllUsers)

app.get('/api/user/:id', controller.getOneUserByID)

app.post('/api/create/user', controller.createNewUser)

app.post('/api/create/admin', controller.createNewAdmin)

app.patch('/api/update/user/:id', controller.updateOneUserByID)

app.patch('/api/update/admin/:id', controller.updateAdminByID)

app.delete('/api/delete/user/:id', controller.deleteOneUserByID)


//! ------------COHORT Routes-----------------
app.get('/api/cohorts', controller.getAllCohorts)

app.get('/api/cohort/:id', controller.getOneCohortByID)

app.post('/api/create/cohort', controller.createNewCohort)

app.patch('/api/update/cohort/:id', controller.updateOneCohortByID)

app.delete('/api/delete/cohort/:id', controller.deleteOneCohortByID)


//! ---------Deployment & 404 route-----------
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.use((_, res) => {
    res.status(404);
    res.setHeader("Content-type", "text/plain");
    res.send("Not Found");
});
