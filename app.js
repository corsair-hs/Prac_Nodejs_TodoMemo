const express = require("express");

const app = express();
const router = express.Router();

const PORT = '8080';

router.get("/", (req, res) => {
  res.send("Hi!");
});
app.use("/api", express.json(), router);



app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 서버가 켜졌어요!`);
});