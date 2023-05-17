const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");

console.log(config.mongoURI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("./models/user");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", async (req, res) => {
  // 회원 가입할 떄 필요한 정보들을 가져오면 DB에 저장한다.
  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});
app.listen(port, () => console.log(`Example App Listening on Port ${port}`));
