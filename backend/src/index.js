const express = require("express");

const db = require("./models");
const app = express();
require("dotenv").config();
const router = require("./routes");
const httpStatus = require("http-status");
require("dotenv").config();
const { errorConverter } = require("./middleware/error");
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// convert error to ApiError, if needed
app.use(errorConverter);

app.use((req, res, next) => {
  next(
    res
      .status(httpStatus.NOT_FOUND)
      .send({ status: false, message: "Not found" })
  );
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log("Error" + err);
  });
db.sequelize.sync();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
