const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allRoutes = require("./routes/allRoutes");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
allRoutes(app);

mongoose.set('strictQuery', false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
