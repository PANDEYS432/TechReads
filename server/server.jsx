const express= require('express');
const app= express();
app.use(express.json());
require("dotenv").config();

const dbconfig = require("./config/dbconfig.jsx");
const port= process.env.PORT || 5000;
const usersRoute = require("./routes/usersRoute.jsx");
const booksRoute = require("./routes/booksRoute.jsx");
 const issuesRoute = require("./routes/issuesRoute.jsx");
// const reportsRoute = require("./routes/reportsRoute");
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issuesRoute);
app.listen(port, ()=> console.log(`server is running on port ${port}`));
