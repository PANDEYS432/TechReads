const express= require('express');
const app= express();
app.use(express.json());
require("dotenv").config();
const dbconfig = require("./config/dbconfig.jsx");
const port= process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute.jsx");

app.use("/api/users", usersRoute);
app.listen(port, ()=> console.log(`server is running on port ${port}`));
