const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();

const dbconfig = require("./config/dbconfig.jsx");
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute.jsx");
const booksRoute = require("./routes/booksRoute.jsx");
const issuesRoute = require("./routes/issuesRoute.jsx");
const reportsRoute = require("./routes/reportsRoute.jsx");

app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/reports", reportsRoute);

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Node server started at ${port}`));
