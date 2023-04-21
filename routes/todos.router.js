const express = require("express");
const router = express.Router();
const TodoDB = require("../models/todo.js");

router.get("/", (req, res) => {
  res.send("Hi!");
});

// 할 일 추가 API
router.post("/todos", async (req, res) => {
  const {value} = req.body;

  // db 존재 유무 체크 : 이미 저장된 order값보다 +1 값으로 저장
  const maxOrderByUserId = await TodoDB.findOne().sort("-order").exec(); // order값을 역순으로 조회할 거다. .exec()를 써서 해당하는 걸 완료한다.

  // maxOrderByUserId가 값이 없다면 1을 할당하고, 있다면 +1을 할당할 것임
  const order = maxOrderByUserId ?
    maxOrderByUserId.order+1 :    // 값이 있을 때
    1;                            // 값이 없을 때

  // order 값을 바탕으로 데이터 생성
  const todo = new TodoDB({value, order});
  await todo.save();

  res.send({todo});
});


// 할 일 조회 API
router.get("/todos", async (req, res) => {
  const todos = await TodoDB.find().sort("-order").exec();
  res.send({todos});
});




module.exports = router;