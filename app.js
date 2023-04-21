const express = require("express");   // express library 가져오고
const app = express();                // express로 app객체를 만들고
const router = express.Router();      // express로 Router 만들고
const PORT = '8080';                  // HTTP Port :8080



// HTTP Router Root "/api" - Back-end
app.use("/api", express.json(), router);
// app.use 는 미들웨어를 사용하게 해주는 코드
// app 객체에 use라는 미들웨어를 등록하였고
// '/api'로 접속하였을 때 express.json() 미들웨어를 거치고
// 해당하는 router로 찾아가는 것
// 그렇기 때문에 지금 코드 다음에 router.get이 실행되는 거임~

// router로 get API를 만들고
router.get("/", (req, res) => {
  res.send("Hi!");
});

// 추가로 express.json() 미들웨어는
// req.body로 들어오는 데이터를 사용할 수 있도록 해주는 미들웨어임

// HTTP Port listen
app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 서버가 켜졌어요!`);
});