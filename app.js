const express = require("express");   // express library import
const app = express();                // express app
const router = express.Router();      // express Router
const PORT = '8080';                  // HTTP Port :8080

// HTTP Root "/" - Front-end
router.get("/", (req, res) => {
  res.send("Hi!");
});

// HTTP Router Root "/api" - Back-end
app.use("/api", express.json(), router);

// HTTP Port listen
app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 서버가 켜졌어요!`);
});